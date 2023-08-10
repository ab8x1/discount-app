'use client'
import { useEffect, useState } from "react";
import { DetailsGrid, DetailsContainer, InfoContent, InfoRow, ReversedMobileOrder } from "../DealDetails/DetailsStyles";
import ReedemEarly from "./ReedemEarly";
import EditDealInfo from "./EditDealInfo";
import Image from "next/image";
import DealDetailsProgress from "../DealDetails/DetailsProgress";
import { PurchasedDeal } from "@/types/deal";
import { useConnectWallet } from "@web3-onboard/react";
import timestampToDate from "@/helpers/timestampToDate";
import { days_between, currentValue, RefreshValue } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";

export default function EditDeal({
    id
} : {
    id: string
}){
    const [deal, setDeal] = useState<PurchasedDeal | null>();
    const [{ wallet }, connect] = useConnectWallet();
    const {address} = wallet?.accounts[0] ?? {};
    useEffect(() => {
        if(address){
            const allDeals = JSON.parse(window.localStorage.getItem('purchasedDeals') || "{}");
            const userDeals: PurchasedDeal[] | undefined = allDeals?.[address];
            const userDeal = userDeals?.find(deal => deal.id === id);
            if(userDeal)
                setDeal(userDeal);
            else
                setDeal(null);
        }
        else setDeal(null);
    }, [address])
    return(
        <>
            {
                deal ?
                <DetailsGrid>
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
                        <DetailsContainer style={{marginTop: '15px'}}>
                            <InfoContent>
                                <h3>Earnings</h3>
                                <InfoRow>
                                    <span>Avg. 24hr Profits:</span>
                                    <span className="brand">{fixedNumber((deal.amount - deal.purchasePrice) / days_between(deal.date.purchasedAt, deal.date.maturity))} {deal.token}</span>
                                </InfoRow>
                                <InfoRow>
                                    <span>Total Profits So Far:</span>
                                    <span className="brand">
                                        <span style={{marginRight: '5px'}}>
                                            <RefreshValue
                                                updateFunction={() => currentValue(deal.amount - deal.purchasePrice, deal.date.purchasedAt, deal.date.maturity)}
                                                roundTo={8}
                                            />
                                        </span>
                                        USDC
                                    </span>
                                </InfoRow>
                            </InfoContent>
                        </DetailsContainer>
                    </ReversedMobileOrder>
                    <ReedemEarly/>
                    <DetailsContainer>
                        <InfoContent>
                            <h3 className="alignY" style={{gap: '5px'}}>
                                FAQ
                                <Image src="/navIcons/faq.svg" width={24} height={24} alt="faq"/>
                            </h3>
                            <p style={{margin: '10px 0'}}>
                                When redeeming early, the amount of tokens you receive will depend on various factors such as time remaining and available liquidity.
                            </p>
                        </InfoContent>
                    </DetailsContainer>
                </DetailsGrid>
                : deal === null
                ? <h1>Deal not found</h1>
                : null
            }
        </>
    )
}
