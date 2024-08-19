"use client"
import { OfferType } from "@/types/offer"
import { Contract, formatUnits, parseUnits } from "ethers";
import {defaultProvider} from "@/hooks/useUser";
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import { discountContractAddress } from "@/consts/globalConsts";

const discountV1ABI = DISCOUNTV1_ABI.abi;

export default async function previewDiscountedAsset(offerInfo: OfferType, amount: number): Promise<{
    userWillGet: number | null,
    passedAmount: number
}>{
    return new Promise (async (res, rej) => {
        try{
            const {curvePool, IBTindexInCurvePool, PTindexInCurvePool} = offerInfo;
            const discountContract = new Contract(discountContractAddress, discountV1ABI, defaultProvider);
            const etherAmount = parseUnits(amount.toString(), "ether");
            const previewResult = await discountContract.previewBuyDiscountedAsset(
                etherAmount,
                curvePool,
                IBTindexInCurvePool,
                PTindexInCurvePool
            );
            const userWillGet = Number(formatUnits(previewResult, "ether")) * 0.999;

            res({userWillGet, passedAmount: amount})
        }
        catch(e){
            console.log(e);
            rej(null);
        }
    })
}
