"use client"
import { OfferDetailsGrid, ReversedMobileOrder } from "../Offer/DetailsStyles";
import ReedemEarly from "./ReedemEarly";
import EditDealInfo from "./EditDealInfo";
import DealDetailsProgress from "../Offer/DetailsProgress";
import { DealType } from "@/types/deal";
import DisplayEarnings from "./DisplayEarnings";
import BackButton from "../Navbar/BackButton";
import useUser from "@/hooks/useUser";

export default function EditDeal({
    deal
} : {
    deal: DealType | null
}){
    const user = useUser();
    return(
        <>
            <BackButton/>
            {
                deal && user?.address === deal.owner ?
                deal.date?.redeemedAt ?
                <DisplayEarnings deal={deal} timestamp={deal.date?.redeemedAt}/>
                :
                <OfferDetailsGrid $summary>
                    <EditDealInfo deal={deal}/>
                    <ReversedMobileOrder>
                        <DisplayEarnings deal={deal}/>
                        <DealDetailsProgress
                            amount={deal.purchasePrice}
                            dealDetails={{
                                token: 'USDT',
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
                    <ReedemEarly deal={deal}/>
                </OfferDetailsGrid>
                : <h1 style={{marginTop: "50px"}}>Deal not found</h1>
            }
        </>
    )
}
