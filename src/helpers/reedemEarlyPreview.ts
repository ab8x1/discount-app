import { Contract, JsonRpcProvider, formatEther } from "ethers";
import { getDisocuntContractAddress } from "@/consts/globalConsts";
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import { OfferType } from "@/types/offer";
const discountV1ABI = DISCOUNTV1_ABI.abi;

export default async function reedemEarlyPreview(offerData: OfferType, amount: BigInt): Promise<number>{
    try{
        const defaultProvider = new JsonRpcProvider(offerData.chainRpcUrl);
        const {curvePool} = offerData;
        const discountContract = new Contract(getDisocuntContractAddress(offerData.chainHexId), discountV1ABI, defaultProvider);
        const previewClaimEarlyAmount = await discountContract.previewClaimPTEarly(
            curvePool, //curve pool
            amount
        );
        const claimEarlyAmount = Number(formatEther(previewClaimEarlyAmount)) * 0.999;
        return claimEarlyAmount;
    }
    catch(e){
        console.log("Error in reedemEarlyPreview helper function:", e);
        return 0;
    }
}