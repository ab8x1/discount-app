"use client"
import { OfferType } from "@/types/offer"
import { Contract, formatUnits, parseUnits } from "ethers";
import {defaultProvider} from "@/hooks/useUser";
import CURVE_ABI from "@/artifacts/contracts/curve/ICurvePool.sol/ICurvePool.json"
import ERC20_ABI from "@/artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json"
import PT_ABI from "@/artifacts/contracts/spectra/IPrincipalToken.sol/IPrincipalToken.json"
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import { alignSpotPriceDecimals } from "@/helpers/alignSpotPriceDecimals";
import { discountContractAddress } from "@/consts/globalConsts";

const curvePoolAbi = CURVE_ABI.abi;
const eRC20Abi = ERC20_ABI.abi;
const ptAbi = PT_ABI.abi;
const discountV1ABI = DISCOUNTV1_ABI.abi;

export default async function previewDiscountedAsset(dealInfo: OfferType, amount: number): Promise<{
    userWillGet: number | null,
    passedAmount: number
}>{
    return new Promise (async (res, rej) => {
        try{
            const {curvePool, IBTindexInCurvePool, PTindexInCurvePool} = dealInfo;
            const curvePoolContract = new Contract(curvePool, curvePoolAbi, defaultProvider);
            const ptAddress = await curvePoolContract.coins(PTindexInCurvePool);
            const ptContract = new Contract(ptAddress, ptAbi, defaultProvider);
            const underlyingTokenAddress = await ptContract.underlying();
            const underlyingERC20Contract = new Contract(underlyingTokenAddress, eRC20Abi, defaultProvider);
            const underlyingDecimals = await underlyingERC20Contract.decimals();
            const ptDecimals = await ptContract.decimals();
            const discountContract = new Contract(discountContractAddress, discountV1ABI, defaultProvider);
            const etherAmount = parseUnits(amount.toString(), "ether");
            const previewResult = await discountContract.previewBuyDiscountedAsset(
                etherAmount,
                curvePool,
                IBTindexInCurvePool,
                PTindexInCurvePool
            );
            const previewResultNormalized = alignSpotPriceDecimals(previewResult, Number(underlyingDecimals) + 27 - Number(ptDecimals), Number(ptDecimals));
            const userWillGet = amount * Number(formatUnits(previewResultNormalized, "ether"));

            res({userWillGet, passedAmount: amount})
        }
        catch(e){
            console.log(e);
            rej(null);
        }
    })
}
