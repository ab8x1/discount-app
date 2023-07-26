'use client'
import { useState } from "react"
import { DetailsGrid } from "./DetailsStyles"
import DealDetailsProgress from "./DetailsProgress"
import DealDetails from "./Details"
import { ThinDeal } from "@/types/deal"
import Faq from "./FAQ"
import { DealDetailsType, Stage } from "./DetailsTypes"

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
                <DealDetailsProgress amount={amount} dealDetails={dealDetails} step="buy"/>
            </DetailsGrid>
            <Faq/>
        </>
    )
}
