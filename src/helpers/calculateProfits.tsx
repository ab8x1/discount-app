"use client"
import { useEffect, useState } from "react";
import { DealType } from "@/types/deal";
import fixedNumber from "./fixedNumber";
import reedemEarlyPreview from "./reedemEarlyPreview";
import { exampleOffers } from "@/consts/exampleDeals";

type offersAmounts = {
    [offerId: string]: {
        amount: bigint
    }
}

function getDealSpecification(deal: DealType){
    return{
        profit: deal.amount - deal.purchasePrice,
        time: deal.date?.redeemedAt || Date.now(),
        start: deal.date.purchasedAt,
        end: deal.date.maturity
    }
}

export async function getTotalBalance(deals: DealType[]){
    return new Promise<number>(async (res) => {
        try{
            const offersAmounts = deals.reduce((acc: offersAmounts, deal) => ({
                ...acc,
                [deal.offerId]: {
                    amount: (acc[deal.offerId]?.amount || BigInt(0)) + BigInt(deal.amountBigIntStringified)
                }
            }), {});
            let amount = 0;
            const dealsOfferIds = Object.keys(offersAmounts);
            for (const dealOfferId of dealsOfferIds){
                const offerData = exampleOffers.find(offer => offer.id === dealOfferId);
                if(offerData){
                    const reedemPreview = await reedemEarlyPreview(offerData, offersAmounts[dealOfferId]?.amount);
                    amount += reedemPreview;
                }
            }
            res(amount)
        }
        catch(e){
            console.log("Error in getTotalBalance helper function");
            console.log(e);
            res(0);
        }
    })
}

//actual profit of the deal
export function actualProfitValue(deal: DealType){
    const { profit, start, end, time } = getDealSpecification(deal);
    return profit * (time >= end ? 1 : ((time - start) / (end - start)));
}

//tells how much a deal is worth now
export function reedemValue(deal: DealType){
    return deal.purchasePrice + actualProfitValue(deal);
}

//total deal profits
export function fixedProfit(deal: DealType){
    // if reedem early
    if(deal?.date?.redeemedAt && deal?.date?.redeemedAt < deal.date.maturity){
        const fee = fixedNumber(0.001 * deal.purchasePrice, false, 2, true) as number;
        const actualProfit = actualProfitValue(deal);
        return actualProfit - fee > 0 ? actualProfit - fee : 0;
    }
    // if waited until maturity
    else{
        return deal.amount - deal.purchasePrice;
    }
}

//daily profits of active positions
export function activeDailyProfit(deal: DealType){
    const { profit, start, end } = getDealSpecification(deal);
    return deal?.date?.redeemedAt ? 0 : (profit / days_between(start, end))
}

export function RefreshValue({
    updateFunction,
    roundTo
} : {
    updateFunction: () => number,
    roundTo: number
}){
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newProfit = updateFunction();
            setValue(newProfit);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [updateFunction]);
    return(
        <>
            {fixedNumber(value, true, roundTo)}
        </>
    )
}

export function days_between(date1 = 0, date2 = 0) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    return differenceMs / ONE_DAY;
}