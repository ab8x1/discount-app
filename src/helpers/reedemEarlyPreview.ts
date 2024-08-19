import { Contract, formatEther } from "ethers";
import { discountContractAddress } from "@/consts/globalConsts";
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import {defaultProvider} from "@/hooks/useUser";
import { OfferType } from "@/types/offer";
const discountV1ABI = DISCOUNTV1_ABI.abi;

export default function reedemEarlyPreview(offerData: OfferType, amount: BigInt){
    return new Promise<number>(async (res) => {
        try{
            const discountContract = new Contract(discountContractAddress, discountV1ABI, defaultProvider);
            const previewClaimEarlyAmount = await discountContract.previewClaimPTEarly(
                offerData.curvePool, //curve pool
                offerData.PTindexInCurvePool, //i / inputTokenIndex
                offerData.IBTindexInCurvePool, //j / outputTokenIndex
                amount
            );
            const claimEarlyAmount = Number(formatEther(previewClaimEarlyAmount)) * 0.999;
            res(claimEarlyAmount);
        }
        catch(e){
            console.log("Error in reedemEarlyPreview helper function");
            console.log(e);
            res(0);
        }
    })
}