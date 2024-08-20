import { UserType } from "@/hooks/useUser";
import ERC20ABI from "@/artifacts/contracts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { Contract, formatEther } from "ethers";
const erc20Abi = ERC20ABI.abi;

export default async function erc20TokenBalance(user: UserType, tokenAddress: string): Promise<number | null> {
    try {
        const { address, signer } = user;
        const erc20Contract = new Contract(tokenAddress, erc20Abi, signer);
        const balance = await erc20Contract.balanceOf(address);
        return Number(formatEther(balance));
    } catch (e) {
        console.log("Error in erc20TokenBalance function:", e);
        return null;
    }
}