'use client'
import { useState } from "react"
import { DetailsContainer, DetailsGrid, InfoContent, InfoRow } from "./DetailsStyles"
import DealDetailsProgress from "./DetailsProgress"
import DealDetails from "./Details"
import { ThinDeal } from "@/types/deal"
import Faq from "./FAQ"
import { DealDetailsType, Stage } from "./DetailsTypes"
import Image from "next/image"

export default function DetailsState({
    thinDeal
} : {
    thinDeal: ThinDeal
}){
    const {discountedPrice, originalPrice, date} = thinDeal;
    const [amount, setAmount] = useState<number>(0);
    const [stage, setStage] = useState<Stage>("buy");
    const discount = 100 - (discountedPrice / originalPrice) * 100;
    const earn = amount * Number(discount) / 100;
    const dealDetails : DealDetailsType = {
        discount,
        reedem: amount + earn,
        earn,
        roi: discount,
        date
    }
    return(
        <>
            <DetailsGrid style={{alignItems: 'flex-start'}}>
                <DealDetails setAmount={setAmount} dealDetails={dealDetails} stage={stage} amount={amount} setStage={setStage}/>
                <div>
                    <DealDetailsProgress amount={amount} dealDetails={dealDetails} step="buy"/>
                    <DetailsContainer style={{marginTop: '15px'}}>
                        <InfoContent>
                            <h3 className="brand alignY" style={{gap: '5px'}}>
                                <Image src="/shield-tick.svg" width={24} height={24} alt="shield"/>
                                Redeem Anytime
                            </h3>
                            <p style={{margin: '10px 0'}}>
                                You can get out of this deal anytime by redeeming <b style={{color: '#627EEA'}}>Discounted USDC</b> back to USDC via <b>My Earnings</b> page. You will receive your initial capital and partly accrued fixed profit.
                            </p>
                        </InfoContent>
                    </DetailsContainer>
                </div>
            </DetailsGrid>
            <Faq/>
        </>
    )
}
