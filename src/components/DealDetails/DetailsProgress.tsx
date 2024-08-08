'use client'
import { ProgressContainer, ProgressTitle, Step } from "./DetailsStyles"
import timestampToDate from "@/helpers/timestampToDate"
import fixedNumber from "@/helpers/fixedNumber"
import { DealDetailsType } from "./DetailsTypes"
import { tokens } from "@/types/deal"

export default function DealDetailsProgress({
    amount,
    dealDetails,
    step,
    token

} : {
    amount: number,
    dealDetails: DealDetailsType,
    step: "buy" | "wait" | "earn",
    token: tokens
}){
    const {date, earn, reedem} = dealDetails;
    const fee = fixedNumber(amount * 0.001, false, 2, true) as number;
    return(
        <ProgressContainer>
            <ProgressTitle>Progress</ProgressTitle>
            <Step $status={step === "buy" ? "filled" : "fullfilled"}>
                <div>
                    <p className="brand">{step === "buy" ? 'Pay Now' : 'You Paid'}</p>
                    <p><span>{amount} {token}</span></p>
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
                    <p>Claim <span>{fixedNumber(reedem || 1, false, 2)} {token}</span></p>
                    <p>Earn <span style={{color: 'var(--brand-color)'}}>{fixedNumber(earn || 1, false, 2)} {token}</span></p>
                </div>
            </Step>
        </ProgressContainer>
    )
}
