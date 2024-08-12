import { Contract, parseUnits } from "ethers";
import { UserType } from "@/hooks/useUser";
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import ERC20ABI from "@/artifacts/contracts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { discountContractAddress } from "@/consts/globalConsts";
import { DealType } from "@/types/deal";
import { DealDetailsType } from "../DetailsTypes";
import { v4 as uuidv4 } from 'uuid';
import fixedNumber from "@/helpers/fixedNumber";

const erc20Abi = ERC20ABI.abi;
const discountV1ABI = DISCOUNTV1_ABI.abi;
const underlyingToken = "0x0372cE7418865080D82d0B6677a692a2c045e4D3"; //(spectra USDT):

export default async function buyDeal(
    amount: number,
    user: UserType,
    dealDetails: DealDetailsType
){
    return new Promise<{status: "success" | "error", message: string, newOfferId: string}> (async (res, rej) => {
        try{
            const { signer, address } = user;
            const parsedAmount = parseUnits(amount.toString(), "ether");

            const underlyingERC20Contract = new Contract(underlyingToken, erc20Abi, signer);
            const txApprove = await underlyingERC20Contract.approve(discountContractAddress, parsedAmount);
            await txApprove.wait();
            const discountContract = new Contract(discountContractAddress, discountV1ABI, signer);

            const tx = await discountContract.buyDiscountedAsset(
                parsedAmount,
                "0x080732d65987C5D5F9Aaa72999d7B0e02713aE72",
                0,
                1
            );
            await tx.wait();

            const {date, discount, earn, reedem, roi, token} = dealDetails;
            const newId = uuidv4();
            const newDeal: DealType = {
                id: newId,
                owner: address,
                amount: Number(fixedNumber(reedem || 0, false, 5)),
                discount: discount || 0,
                purchasePrice: amount,
                token,
                date: {
                    purchasedAt: Date.now(),
                    maturity: date.end
                }
            }
            const addToDbStatus = await saveDealInDB(newDeal);
            if(addToDbStatus){
                res({
                    status: "success",
                    message: "Deal purchase completed",
                    newOfferId: newId
                });
            }
            else{
                rej("Deal purchase completed but information not saved, please contact our support");
            }

        }
        catch(e){
            console.log(e);
            rej("Deal purchase failed")
        }
    })
}

async function saveDealInDB(data: any) {
    return new Promise<boolean>(async(res) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/saveDeal`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            });

            if (!response.ok) {
              console.log(`HTTP error! status: ${response.status}`);
              res(false);
            }

            res(true);

          } catch (error) {
            console.error('Error:', error);
            res(false);
          }
    })
}