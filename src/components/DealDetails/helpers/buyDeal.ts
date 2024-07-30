import { Contract, parseUnits } from "ethers";
import { UserType } from "@/hooks/useUser";
import DiscountAbi from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json";

const discountContractAddress = "0x38A90a2E857d4cC8343CF8A57056B8B36B725863";
const discountV1ABI = DiscountAbi.abi;
const underlyingToken = "0x0372cE7418865080D82d0B6677a692a2c045e4D3"; //(spectra USDT):

export default async function buyDeal(
    amount: number,
    user: UserType,
){
    return new Promise<string> (async (res, rej) => {
        const { signer } = user;
        const discountContract = new Contract(discountContractAddress, discountV1ABI, signer);
        const tx = await discountContract.buyDiscountedAsset(
            underlyingToken,
            parseUnits(amount.toString()),
            "0xD7fd5213B94Cb3B2BBFdeDf5fB5Ac7b5644552b1", //IBT
            "0x080732d65987C5D5F9Aaa72999d7B0e02713aE72", //curvePool
            0,
            1
        );
        res("newPurchase.id");
    })
}