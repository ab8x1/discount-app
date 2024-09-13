import { Contract, parseUnits, zeroPadValue, getBigInt, formatEther, parseEther } from "ethers";
import { UserType } from "@/hooks/useUser";
import ERC20ABI from "@/artifacts/contracts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { getDisocuntContractAddress } from "@/consts/globalConsts";
import { DealType } from "@/types/deal";
import { DealDetailsType } from "../DetailsTypes";
import { v4 as uuidv4 } from 'uuid';
import { OfferType } from "@/types/offer";
import saveOrEditDealInDB from "@/helpers/saveOrEditDealInDb";
import readReceipt from "@/helpers/readReceipt";

const erc20Abi = ERC20ABI.abi;

export default async function buyDeal(amount: number, user: UserType, dealDetails: DealDetailsType, offerData: OfferType): Promise<{newOfferId: string, realReedem: number, message?: string} | null>{
    try{
        const { signer, address, discountContract, updateUserDeals, currentChain } = user;
        const {date, discount, offerId, token, reedem} = dealDetails;
        const { underlyingTokenAddress, curvePool } = offerData;
        const parsedAmount = parseUnits(amount.toString(), "ether");

        const underlyingERC20Contract = new Contract(underlyingTokenAddress, erc20Abi, signer);
        const txApprove = await underlyingERC20Contract.approve(getDisocuntContractAddress(currentChain), parsedAmount);
        await txApprove.wait();

        const tx = await discountContract.buyDiscountedAsset(
            parsedAmount,
            curvePool,
            parseEther(reedem?.toString() || "0")
        );
        const receipt = await tx.wait();
        const decodedAmount = readReceipt(receipt, address, offerData.ptAddress.toLocaleLowerCase()) || BigInt(reedem as number); //decode the amount that user got from tx recepit, if decoding fails get the estimated value
        const realReedem = Number(formatEther(decodedAmount));

        const newId = uuidv4();
        const newDeal: DealType = {
            id: newId,
            offerId,
            owner: address,
            amountBigIntStringified: decodedAmount.toString(),
            amount: realReedem,
            discount: discount || 0,
            purchasePrice: amount,
            token,
            date: {
                purchasedAt: Date.now(),
                maturity: date.end
            }
        }
        const addToDbStatus = await saveOrEditDealInDB({newDeal});
        if(addToDbStatus) updateUserDeals(newDeal);
        return{
            newOfferId: newId,
            realReedem,
            message: !addToDbStatus ? "Deal purchase completed but information not saved, please contact our support" : undefined,
        };
    }
    catch(e){
        console.log("Deal purchase failed:", e);
        return null;
    }
}