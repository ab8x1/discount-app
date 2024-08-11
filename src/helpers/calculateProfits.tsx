import { useEffect, useState } from "react";
import { DealType } from "@/types/deal";
import fixedNumber from "./fixedNumber";

function getDealSpecification(deal: DealType){
    return{
        profit: deal.amount - deal.purchasePrice,
        time: deal.date?.redeemedAt || Date.now(),
        start: deal.date.purchasedAt,
        end: deal.date.maturity
    }
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