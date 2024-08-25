import { UserType } from "@/hooks/useUser";
import { OfferType } from "@/types/offer";
import ERC20 from "@/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { Contract, formatEther, parseEther } from "ethers";
import { discountContractAddress } from "@/consts/globalConsts";
import { DealType } from "@/types/deal";
import saveOrEditDealInDB from "./saveOrEditDealInDb";
import readReceipt from "./readReceipt";
const iERC20ABI = ERC20.abi;

type RedeemType = {
    value: number,
    message?: string
} | null

export default async function reedemOrClaimEarly(type: "reedem" | "claimEarly", user: UserType, offerData: OfferType, deal: DealType, estimatedReedem: number): Promise<RedeemType>{
    try{
        const {discountContract, updateUserDeals, address} = user;
        const {amountBigIntStringified} = deal;
        const {ptAddress, curvePool, PTindexInCurvePool, IBTindexInCurvePool, underlyingTokenAddress} = offerData;
        let amountAfterReedem = estimatedReedem;
        const ptContract = new Contract(
            ptAddress,
            iERC20ABI,
            user.signer
        );
        const txApprove = await ptContract.approve(
            discountContractAddress,
            BigInt(amountBigIntStringified)
        );
        await txApprove.wait();

        if(type === "claimEarly"){
            const txClaimEarly = await discountContract.claimPTEarly(
                curvePool, //curve pool
                PTindexInCurvePool, //i / inputTokenIndex
                IBTindexInCurvePool, //j / outputTokenIndex
                BigInt(amountBigIntStringified),
                parseEther(estimatedReedem.toString()) //minAmountOut, result of previewRedeeemOrClaimEarly, might be necessary to multiply by 0.99 in prod
            );
            const claimReceipt = await txClaimEarly.wait();
            const realReedem = readReceipt(claimReceipt, address, underlyingTokenAddress) || BigInt(estimatedReedem);
            amountAfterReedem = Number(formatEther(realReedem));
        }
        else {
            const txRedeem = await discountContract.redeemDiscountedAsset(
                ptAddress,
                BigInt(amountBigIntStringified),
            );
            await txRedeem.wait();
        }

        const redeemedAt = Date.now();
        const addToDbStatus = await saveOrEditDealInDB({
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
            amountAfterReedem,
            date: {
                ...deal.date,
                redeemedAt
            }
        }, deal.offerId)
        return {
            value: amountAfterReedem,
            message: !addToDbStatus ? "Deal reedem completed but information not saved, please contact our support" : undefined
        };
    }
    catch(e){
        console.log(e);
        return null
    }

}