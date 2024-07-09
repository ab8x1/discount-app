'use client'
import { useEffect, useState } from "react";
import { DealGrid, ReversedMobileOrder } from "../DealDetails/DetailsStyles";
import ReedemEarly from "./ReedemEarly";
import EditDealInfo from "./EditDealInfo";
import DealDetailsProgress from "../DealDetails/DetailsProgress";
import { PurchasedDeal } from "@/types/deal";
import { useConnectWallet } from "@web3-onboard/react";
import DisplayEarnings from "./DisplayEarnings";
import BackButton from "../Navbar/BackButton";

export default function EditDeal({
    id
} : {
    id: string
}){
    const [deal, setDeal] = useState<PurchasedDeal | null>();
    const [{ wallet }, connect] = useConnectWallet();
    const {address} = wallet?.accounts[0] ?? {};
    useEffect(() => {
        const allDeals = JSON.parse(window.localStorage.getItem('purchasedDeals') || "{}");
        const userDeals: PurchasedDeal[] | undefined = allDeals?.[address || 'unloggedDeals'];
        const userDeal = userDeals?.find(deal => deal.id === id);
        if(userDeal)
            setDeal(userDeal);
        else
            setDeal(null);

    }, [address])
    return(
        <>
            <BackButton/>
            {
                deal ?
                deal.date?.redeemedAt ?
                <DisplayEarnings deal={deal} timestamp={deal.date?.redeemedAt}/>
                :
                <DealGrid $summary>
                    <EditDealInfo deal={deal}/>
                    <ReversedMobileOrder>
                        <DisplayEarnings deal={deal}/>
                        <DealDetailsProgress
                            amount={deal.purchasePrice}
                            dealDetails={{
                                token: 'USDC',
                                discount: 0,
                                reedem: deal.amount,
                                earn: deal.amount - deal.purchasePrice,
                                roi: 0,
                                date: {
                                    start: 0,
                                    end: deal.date.maturity
                                }
                            }}
                            step="wait"
                            token={deal.token}
                        />
                    </ReversedMobileOrder>
                    <ReedemEarly deal={deal} address={address || ''}/>
                </DealGrid>
                : deal === null
                ? <h1>Deal not found</h1>
                : null
            }
        </>
    )
}
