'use client'
import { ProgressContainer, ProgressTitle, Step } from "./DetailsStyles"
import timestampToDate from "@/helpers/timestampToDate"
import fixedNumber from "@/helpers/fixedNumber"
import { DealDetailsType } from "./DetailsTypes"

export default function DealDetailsProgress({
    amount,
    dealDetails,
    step

} : {
    amount: number,
    dealDetails: DealDetailsType,
    step: "buy" | "wait" | "earn"
}){
    const {date, earn, reedem} = dealDetails;
    const fee = fixedNumber(amount * 0.001, false, 2, true) as number;
    return(
        <ProgressContainer>
            <ProgressTitle>Progress</ProgressTitle>
            <Step $status={step === "buy" ? "filled" : "fullfilled"}>
                <div>
                    <p className="brand">{step === "buy" ? 'Pay Now' : 'You Paid'}</p>
                    <p><span>{amount} USDC</span></p>
                </div>
            </Step>
            <Step $status={step === "buy" ? "next" : "filled"}>
                <div>
                    <p>Wait until Claim Date</p>
                    <p>{timestampToDate(date.end)}</p>
                </div>
            </Step>
            <Step $status={step === "wait" ? "next" : step === "earn" ? "filled" : "pending"}>
                <div>
                    <p>On Claim Date</p>
                    <p>Claim <span>{fixedNumber(reedem)} USDC</span></p>
                    <p>Earn <span style={{color: 'var(--brand-color)'}}>{fixedNumber(earn)} USDC</span></p>
                </div>
            </Step>
        </ProgressContainer>
    )
}
