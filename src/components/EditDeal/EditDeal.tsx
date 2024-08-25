"use client"
import { OfferDetailsGrid, ReversedMobileOrder } from "../Offer/DetailsStyles";
import ReedemEarly from "./ReedemEarly";
import EditDealInfo from "./EditDealInfo";
import DealDetailsProgress from "../Offer/DetailsProgress";
import { DealType } from "@/types/deal";
import DisplayEarnings from "./DisplayEarnings";
import BackButton from "../Navbar/BackButton";
import useUser from "@/hooks/useUser";
import reedemEarlyPreview from "@/helpers/reedemEarlyPreview";
import { useState, useEffect } from "react";
import { exampleOffers } from "@/consts/exampleDeals";

export default function EditDeal({
    deal
} : {
    deal: DealType | null
}){
    const [estimatedReedem, setEstimatedReedem] = useState<number>(0);
    const user = useUser();
    const offerData = exampleOffers.find(offer => offer.id === deal?.offerId);

    useEffect(() => {
        const getReedemEarlyPreview = async() => {
            if(deal && offerData){
                const reedemPreview = await reedemEarlyPreview(offerData, BigInt(deal.amountBigIntStringified));
                setEstimatedReedem(reedemPreview);
            }
        }
        getReedemEarlyPreview();
    }, [])

    return(
        <>
            <BackButton/>
            {
                deal && offerData && user?.address === deal.owner ?
                deal.date?.redeemedAt ?
                <DisplayEarnings deal={deal} timestamp={deal.date?.redeemedAt} estimatedReedem={estimatedReedem}/>
                :
                <OfferDetailsGrid $summary>
                    <EditDealInfo deal={deal}/>
                    <ReversedMobileOrder>
                        <DisplayEarnings deal={deal} estimatedReedem={estimatedReedem}/>
                        <DealDetailsProgress
                            amount={deal.purchasePrice}
                            dealDetails={{
                                token: 'USDT',
                                offerId: deal.offerId,
                                discount: 0,
                                reedem: deal.amount,
                                earn: deal.amount - deal.purchasePrice,
                                roi: 0,
                                date: {
                                    start: 0,
                                    end: deal.date.maturity
                                },
                                chainHexId: "0xaa36a7"
                            }}
                            step="wait"
                            token={deal.token}
                        />
                    </ReversedMobileOrder>
                    <ReedemEarly deal={deal} user={user} estimatedReedem={estimatedReedem} offerData={offerData}/>
                </OfferDetailsGrid>
                : <h1 style={{marginTop: "50px"}}>Deal not found</h1>
            }
        </>
    )
}
