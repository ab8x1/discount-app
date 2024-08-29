"use client"
import { OfferType } from "@/types/offer"
import { Contract, formatUnits, JsonRpcProvider, parseUnits } from "ethers";
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import { discountContractAddress } from "@/consts/globalConsts";

const discountV1ABI = DISCOUNTV1_ABI.abi;

export default async function previewDiscountedAsset(offerInfo: OfferType, amount: number): Promise<{
    userWillGet: number | null,
    passedAmount: number
} | null>{
    try{
        const defaultProvider = new JsonRpcProvider(offerInfo.chainRpcUrl);
        const {curvePool} = offerInfo;
        const discountContract = new Contract(discountContractAddress, discountV1ABI, defaultProvider);
        const etherAmount = parseUnits(amount.toString(), "ether");
        const previewResult = await discountContract.previewBuyDiscountedAsset(
            etherAmount,
            curvePool,
        );
        const userWillGet = Number(formatUnits(previewResult, "ether")) * 0.999;

        return {userWillGet, passedAmount: amount};
    }
    catch(e){
        console.log(e);
        return null;
    }
}
