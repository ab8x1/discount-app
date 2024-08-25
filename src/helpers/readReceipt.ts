import { zeroPadValue, getBigInt, formatEther } from "ethers";

export default function readReceipt(receipt: any, uderAddress: string, tokenAddress: string){
    try{
        const paddedSenderAddress = zeroPadValue(uderAddress, 32);
        const logs = receipt?.logs?.filter((log: any) =>
            //what the user receivs:
            log?.address?.toLowerCase() ===  tokenAddress.toLowerCase() && //Searched Token
            log?.topics[2] === paddedSenderAddress //to owner
        );
        const log = logs?.[0];
        const decodedAmount = getBigInt(log?.data);
        return decodedAmount;
    }
    catch(e){
        console.log("Error in readReceipt heleper function: ", e);
        return null
    }
}