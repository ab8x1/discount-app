import { ProgressContainer, ProgressTitle, Step } from "./DealDetailsStyles"

export default function DealDetailsProgress(){

    return(
        <ProgressContainer>
            <ProgressTitle>Progress</ProgressTitle>
            <Step>
                <div>
                    <span>Buy Discounted USDC</span>
                    <span>Spend 1000 USDC today</span>
                </div>
            </Step>
            <Step>
                <div>
                    <span>Wait until Return Date</span>
                    <span>14 June 2024</span>
                </div>
            </Step>
            <Step>
                <div>
                    <span>Earn Fixed Return</span>
                    <span>Redeem 1030 USDC</span>
                    <span>Earn fixed profit of 30 USDC</span>
                </div>
            </Step>
        </ProgressContainer>
    )
}
