import { Contract, formatEther } from "ethers";
import { discountContractAddress } from "@/consts/globalConsts";
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import {defaultProvider} from "@/hooks/useUser";
import { OfferType } from "@/types/offer";
const discountV1ABI = DISCOUNTV1_ABI.abi;

export default async function reedemEarlyPreview(offerData: OfferType, amount: BigInt): Promise<number>{
    try{
        const {curvePool, PTindexInCurvePool, IBTindexInCurvePool} = offerData;
        const discountContract = new Contract(discountContractAddress, discountV1ABI, defaultProvider);
        const previewClaimEarlyAmount = await discountContract.previewClaimPTEarly(
            curvePool, //curve pool
            PTindexInCurvePool, //i / inputTokenIndex
            IBTindexInCurvePool, //j / outputTokenIndex
            amount
        );
        const claimEarlyAmount = Number(formatEther(previewClaimEarlyAmount)) * 0.95;
        return claimEarlyAmount;
    }
    catch(e){
        console.log("Error in reedemEarlyPreview helper function:", e);
        return 0;
    }
}