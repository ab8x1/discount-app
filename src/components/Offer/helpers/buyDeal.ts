import { Contract, parseUnits, zeroPadValue, getBigInt, formatEther, parseEther } from "ethers";
import { UserType } from "@/hooks/useUser";
import ERC20ABI from "@/artifacts/contracts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { discountContractAddress } from "@/consts/globalConsts";
import { DealType } from "@/types/deal";
import { DealDetailsType } from "../DetailsTypes";
import { v4 as uuidv4 } from 'uuid';
import { exampleOffers } from "@/consts/exampleDeals";
import { OfferType } from "@/types/offer";
import saveOrEditDealInDB from "@/helpers/saveOrEditDealInDb";

const erc20Abi = ERC20ABI.abi;

export default async function buyDeal(amount: number, user: UserType, dealDetails: DealDetailsType): Promise<{newOfferId: string, realReedem: number, message?: string} | null>{
    try{
        const { signer, address, discountContract, updateUserDeals } = user;
        const {date, discount, offerId, token, reedem} = dealDetails;
        const offerData = exampleOffers.find(offer => offer.id === offerId) as OfferType;
        const { underlyingTokenAddress, curvePool, IBTindexInCurvePool, PTindexInCurvePool } = offerData;
        const parsedAmount = parseUnits(amount.toString(), "ether");

        const underlyingERC20Contract = new Contract(underlyingTokenAddress, erc20Abi, signer);
        const txApprove = await underlyingERC20Contract.approve(discountContractAddress, parsedAmount);
        await txApprove.wait();

        const tx = await discountContract.buyDiscountedAsset(
            parsedAmount,
            curvePool,
            IBTindexInCurvePool,
            PTindexInCurvePool,
            parseEther(reedem?.toString() || "0")
        );
        const receipt = await tx.wait();
        const paddedSenderAddress = zeroPadValue(address, 32);
        const logs = receipt.logs.filter((log: any) =>
            //what the user receivs:
            log.address.toLowerCase() ===  offerData.ptAddress.toLowerCase() && //PT
            log.topics[2] === paddedSenderAddress //to owner
        );
        const log = logs[0];
        const decodedAmount = getBigInt(log.data);
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