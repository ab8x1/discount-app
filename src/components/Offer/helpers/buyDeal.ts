import { Contract, parseUnits, zeroPadValue, getBigInt, formatEther, ethers } from "ethers";
import { UserType } from "@/hooks/useUser";
import ERC20ABI from "@/artifacts/contracts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { discountContractAddress } from "@/consts/globalConsts";
import { DealType } from "@/types/deal";
import { DealDetailsType } from "../DetailsTypes";
import { v4 as uuidv4 } from 'uuid';
import { exampleOffers } from "@/consts/exampleDeals";
import { OfferType } from "@/types/offer";
import saveOrEdotDealInDB from "@/helpers/saveOrEditDealInDb";

const erc20Abi = ERC20ABI.abi;
const underlyingToken = "0x0372cE7418865080D82d0B6677a692a2c045e4D3"; //(spectra USDT):

export default async function buyDeal(
    amount: number,
    user: UserType,
    dealDetails: DealDetailsType
){
    return new Promise<{status: "success" | "error", message: string, newOfferId: string, realReedem: number}> (async (res, rej) => {
        try{
            const { signer, address, discountContract, updateUserDeals } = user;
            const {date, discount, offerId, token, reedem} = dealDetails;
            const offerData = exampleOffers.find(offer => offer.id === offerId) as OfferType;
            const parsedAmount = parseUnits(amount.toString(), "ether");

            const underlyingERC20Contract = new Contract(underlyingToken, erc20Abi, signer);
            const txApprove = await underlyingERC20Contract.approve(discountContractAddress, parsedAmount);
            await txApprove.wait();

            const tx = await discountContract.buyDiscountedAsset(
                parsedAmount,
                offerData.curvePool,
                offerData.IBTindexInCurvePool,
                offerData.PTindexInCurvePool,
                ethers.parseEther(reedem?.toString() || "0")
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
            const addToDbStatus = await saveOrEdotDealInDB({
                newDeal
            });
            if(addToDbStatus){
                updateUserDeals(newDeal);
                res({
                    status: "success",
                    message: "Deal purchase completed",
                    newOfferId: newId,
                    realReedem
                });
            }
            else{
                rej("Deal purchase completed but information not saved, please contact our support");
            }

        }
        catch(e){
            console.log(e);
            rej("Deal purchase failed")
        }
    })
}