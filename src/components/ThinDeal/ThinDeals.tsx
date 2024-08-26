"use client"
import { OfferType } from "@/types/offer"
import ThinDeal from "./ThinDeal"

export default function ThinDeals({ thinDeals }: {
    thinDeals: OfferType[]
}){
    return(
        <>
            {
                thinDeals.map(thinDeal =>
                    <ThinDeal key={thinDeal.id} dealInfo={thinDeal}/>
                )
            }
        </>
    )
}
