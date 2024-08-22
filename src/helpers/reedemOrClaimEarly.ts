import { UserType } from "@/hooks/useUser";
import { OfferType } from "@/types/offer";
import ERC20 from "@/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { Contract, parseEther } from "ethers";
import { discountContractAddress } from "@/consts/globalConsts";
import { DealType } from "@/types/deal";
import saveOrEdotDealInDB from "./saveOrEditDealInDb";
const iERC20ABI = ERC20.abi;

type RedeemType = {
    value: number,
    message?: string
} | null

export default async function reedemOrClaimEarly(user: UserType, offerData: OfferType, deal: DealType, estimatedReedem: number): Promise<RedeemType>{
    try{
        const {discountContract, updateUserDeals} = user;
        const ptContract = new Contract(
            offerData.ptAddress,
            iERC20ABI,
            user.signer
        );
        const txApprove = await ptContract.approve(
            discountContractAddress,
            BigInt(deal.amountBigIntStringified)
        );
        await txApprove.wait();
        const txClaimEarly = await user.discountContract.claimPTEarly(
            offerData.curvePool, //curve pool
            offerData.PTindexInCurvePool, //i / inputTokenIndex
            offerData.IBTindexInCurvePool, //j / outputTokenIndex
            BigInt(deal.amountBigIntStringified),
            parseEther(estimatedReedem.toString()) //minAmountOut, result of previewRedeeemOrClaimEarly, might be necessary to multiply by 0.99 in prod
        );
        await txClaimEarly.wait();
        const redeemedAt = Date.now();
        const addToDbStatus = await saveOrEdotDealInDB({
            updateDeal: {
                id: deal.id,
                updateData: {
                    parameter: "date.redeemedAt",
                    value: redeemedAt
                }
            }
        });
        updateUserDeals({
            ...deal,
            date: {
                ...deal.date,
                redeemedAt
            }
        }, deal.offerId)
        return {
            value: estimatedReedem,
            message: !addToDbStatus ? "Deal reedem completed but information not saved, please contact our support" : undefined
        };
    }
    catch(e){
        console.log(e);
        return null
    }

}