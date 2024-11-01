"use client"
import { OfferType } from "@/types/offer"
import ThinDeal from "./ThinDeal"
import useUser from "@/hooks/useUser"
import { chains } from "../ChainSelector/ChainSelector"

export default function ThinDeals({ thinDeals }: {
    thinDeals: OfferType[]
}){
    const user = useUser();
    const currentChain = user?.currentChain || "0xa4b1";
    const chainToDisplay = chains.some(chain => chain.id === currentChain) ? currentChain : "0xa4b1";
    console.log(chainToDisplay)

    return(
        <>
            {
                thinDeals.filter(thinDeal => thinDeal.isEnabled && thinDeal.chainHexId === chainToDisplay).map(thinDeal =>
                    <ThinDeal key={thinDeal.id} dealInfo={thinDeal}/>
                )
            }
        </>
    )
}
