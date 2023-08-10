import { useEffect, useState } from "react";
import { PurchasedDeal } from "@/types/deal";
import fixedNumber from "./fixedNumber";

export function currentValue(value: number, start=0, end: number){
    return value * (Date.now() >= end ? 1 : ((Date.now() - start) / (end - start)));
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

// export function dailyProfits(data: SoldOffer[]){
//     return data.reduce((accumulator, {pTokens, details}) => {
//         if((details?.transaction.purchasedAt || Date.now()) < pTokens.maturity.end){
//             const profit = pTokens.amount - details.askingPrice;
//             const daysBetween = days_between(details?.transaction.purchasedAt, pTokens.maturity.end);
//             return accumulator + (profit / daysBetween);
//         }
//         else return accumulator;
//     }, 0) || 0
// }

