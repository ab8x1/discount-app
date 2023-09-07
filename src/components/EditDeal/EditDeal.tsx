'use client'
import { useEffect, useState } from "react";
import { DealGrid, DealContainer, InfoContent, InfoRow, ReversedMobileOrder } from "../DealDetails/DetailsStyles";
import ReedemEarly from "./ReedemEarly";
import EditDealInfo from "./EditDealInfo";
import Image from "next/image";
import DealDetailsProgress from "../DealDetails/DetailsProgress";
import { PurchasedDeal } from "@/types/deal";
import { useConnectWallet } from "@web3-onboard/react";
import DisplayEarnings from "./DisplayEarnings";

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
            {
                deal ?
                deal.date?.redeemedAt ?
                <DisplayEarnings deal={deal} timestamp={deal.date?.redeemedAt}/>
                :
                <DealGrid>
                    <EditDealInfo deal={deal}/>
                    <ReversedMobileOrder>
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
                        />
                        <DisplayEarnings deal={deal}/>
                    </ReversedMobileOrder>
                    <ReedemEarly deal={deal} address={address || ''}/>
                    <DealContainer>
                        <InfoContent>
                            <h3 className="alignY" style={{gap: '5px'}}>
                                FAQ
                                <Image src="/navIcons/faq.svg" width={24} height={24} alt="faq"/>
                            </h3>
                            <p style={{margin: '10px 0'}}>
                                When redeeming early, the amount of tokens you receive will depend on various factors such as time remaining and available liquidity.
                            </p>
                        </InfoContent>
                    </DealContainer>
                </DealGrid>
                : deal === null
                ? <h1>Deal not found</h1>
                : null
            }
        </>
    )
}
