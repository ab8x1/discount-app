import { DealType } from "@/types/deal"
import { useEffect, useState } from "react"
import { Contract, formatUnits, parseUnits } from "ethers";
import useUser, {defaultProvider} from "@/hooks/useUser";
import CURVE_ABI from "@/artifacts/contracts/curve/ICurvePool.sol/ICurvePool.json"
import ERC20_ABI from "@/artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json"
import PT_ABI from "@/artifacts/contracts/spectra/IPrincipalToken.sol/IPrincipalToken.json"
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import { alignSpotPriceDecimals, getDecimalPlaces } from "@/helpers/alignSpotPriceDecimals";
import { discountContractAddress } from "@/consts/globalConsts";

const curvePoolAbi = CURVE_ABI.abi;
const eRC20Abi = ERC20_ABI.abi;
const ptAbi = PT_ABI.abi;
const discountV1ABI = DISCOUNTV1_ABI.abi;

export default function PreviewDiscountedAsset({dealInfo, amount} : {
    dealInfo: DealType,
    amount?: number
}){
    const [discountedPrice, setDiscountedPrice] = useState<number>(amount || 0.01);
    const user = useUser();
    const {curvePool, IBTindexInCurvePool, PTindexInCurvePool} = dealInfo;

    useEffect(() => {
        const getDiscountedPrice = async () => {
            const signerOrProvider = user?.signer || defaultProvider;
            const curvePoolContract = new Contract(curvePool, curvePoolAbi, signerOrProvider);
            const ptAddress = await curvePoolContract.coins(PTindexInCurvePool);
            const ptContract = new Contract(ptAddress, ptAbi, signerOrProvider);
            const underlyingTokenAddress = await ptContract.underlying();
            const underlyingERC20Contract = new Contract(underlyingTokenAddress, eRC20Abi, signerOrProvider);
            const underlyingDecimals = await underlyingERC20Contract.decimals();
            const ptDecimals = await ptContract.decimals();
            const discountContract = new Contract(discountContractAddress, discountV1ABI, signerOrProvider);
            const etherAmount = parseUnits(discountedPrice.toString(), "ether");
            console.log(discountedPrice.toString());
            const previewResult = await discountContract.previewBuyDiscountedAsset(
                etherAmount,
                curvePool,
                IBTindexInCurvePool,
                PTindexInCurvePool
            );
            console.log("decimals: ", (27 - getDecimalPlaces(discountedPrice)));
            const previewResultNormalized = alignSpotPriceDecimals(previewResult, Number(underlyingDecimals) + (27 - getDecimalPlaces(discountedPrice)) - Number(ptDecimals), Number(ptDecimals));

            console.log(formatUnits(previewResultNormalized, "ether"));
        }
        getDiscountedPrice();
    }, [])

    return(
        <>

        </>
    )
}
