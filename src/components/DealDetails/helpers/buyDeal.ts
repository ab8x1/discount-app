import { Contract, parseUnits } from "ethers";
import { UserType } from "@/hooks/useUser";
import DiscountAbi from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json";
import ERC20ABI from "@/artifacts/contracts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

const erc20Abi = ERC20ABI.abi;
const discountContractAddress = "0x64340691B5D04d7e6a4bF268F7472037F4152641";
const discountV1ABI = DiscountAbi.abi;
const underlyingToken = "0x0372cE7418865080D82d0B6677a692a2c045e4D3"; //(spectra USDT):

export default async function buyDeal(
    amount: number,
    user: UserType,
){
    return new Promise<string> (async (res, rej) => {
        const { signer } = user;
        const parsedAmount = parseUnits(amount.toString(), "ether");

        const underlyingERC20Contract = new Contract(underlyingToken, erc20Abi, signer);
        const txApprove = await underlyingERC20Contract.approve(discountContractAddress, parsedAmount);

        const discountContract = new Contract(discountContractAddress, discountV1ABI, signer);
        const tx = await discountContract.buyDiscountedAsset(
            underlyingToken,
            parsedAmount,
            "0xD7fd5213B94Cb3B2BBFdeDf5fB5Ac7b5644552b1", //IBT
            "0x080732d65987C5D5F9Aaa72999d7B0e02713aE72", //curvePool
            0,
            1
        );
        res("newPurchase.id");
    })
}