'use client'
import { ProgressContainer, ProgressTitle, Step } from "./DetailsStyles"
import timestampToDate from "@/helpers/timestampToDate"
import fixedNumber from "@/helpers/fixedNumber"
import { DealDetailsType } from "./DetailsTypes"

export default function DealDetailsProgress({
    amount,
    dealDetails

} : {
    amount: number,
    dealDetails: DealDetailsType
}){
    const {date, earn, reedem} = dealDetails;
    return(
        <ProgressContainer>
            <ProgressTitle>Progress</ProgressTitle>
            <Step $status="filled">
                <div>
                    <p>Buy Discounted USDC</p>
                    <p>Spend <span>{amount} USDC</span> today</p>
                </div>
            </Step>
            <Step $status="next">
                <div>
                    <p>Wait until Return Date</p>
                    <p>{timestampToDate(date.end)}</p>
                </div>
            </Step>
            <Step $status="pending">
                <div>
                    <p>Earn Fixed Return</p>
                    <p>Redeem <span style={{color: '#627EEA'}}>{fixedNumber(reedem)} USDC</span></p>
                    <p>Earn fixed profit of <span style={{color: 'var(--brand-color)'}}>{fixedNumber(earn)} USDC</span></p>
                </div>
            </Step>
        </ProgressContainer>
    )
}
