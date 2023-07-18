'use client'
import { useState } from "react"
import { DetailsGrid } from "./DetailsStyles"
import DealDetailsProgress from "./DetailsProgress"
import DealDetails from "./Details"
import { ThinDeal } from "@/types/deal"
import fixedNumber from "@/helpers/fixedNumber"
import { DealDetailsType } from "./DetailsTypes"

export default function DetailsState({
    thinDeal
} : {
    thinDeal: ThinDeal
}){
    const {discountedPrice, originalPrice, date} = thinDeal;
    const [amount, setAmount] = useState<number>(0);
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
            <DetailsGrid>
                <DealDetails setAmount={setAmount} dealDetails={dealDetails}/>
                <DealDetailsProgress amount={amount} dealDetails={dealDetails}/>
            </DetailsGrid>
        </>
    )
}
