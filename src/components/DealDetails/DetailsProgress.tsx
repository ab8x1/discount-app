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
    return(
        <ProgressContainer>
            <ProgressTitle>Progress</ProgressTitle>
            <Step $status={step === "buy" ? "filled" : "fullfilled"}>
                <div>
                    <p>Buy Discounted USDC</p>
                    <p>Spend <span>{amount} USDC</span> today</p>
                </div>
            </Step>
            <Step $status={step === "buy" ? "next" : "filled"}>
                <div>
                    <p>Wait until Return Date</p>
                    <p>{timestampToDate(date.end)}</p>
                </div>
            </Step>
            <Step $status={step === "wait" ? "next" : step === "earn" ? "filled" : "pending"}>
                <div>
                    <p>Earn Fixed Return</p>
                    <p>Redeem <span style={{color: '#627EEA'}}>{fixedNumber(reedem)} USDC</span></p>
                    <p>Earn fixed profit of <span style={{color: 'var(--brand-color)'}}>{fixedNumber(earn)} USDC</span></p>
                </div>
            </Step>
        </ProgressContainer>
    )
}
