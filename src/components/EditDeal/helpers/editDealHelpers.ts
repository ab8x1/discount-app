import { mergeDeep } from "@/components/Earnings/Chart/chartHelpers";
import { reedemValue } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";
import { PurchasedDeal } from "@/types/deal";

export function reedemEarly(deal: PurchasedDeal, fee: number, address?: string){
    const closedDeal = mergeDeep(deal, {date: {
        redeemedAt: Date.now()
    }});
    const allDeals = JSON.parse(window.localStorage.getItem(`purchasedDeals`) || '{}');
    const userDeals: PurchasedDeal[] | undefined = allDeals?.[address || 'unloggedDeals'];
    const updatedUserDeals = userDeals?.map(deal => deal.id === closedDeal.id ? closedDeal : deal) || {};
    const updatedAllDeals = {
        ...allDeals,
        [address || 'unloggedDeals']: updatedUserDeals
    }
    window.localStorage.setItem('purchasedDeals', JSON.stringify(updatedAllDeals));
    return {
        reedem: fixedNumber(reedemValue(deal) - fee, false, 5, true) as number,
        amount: deal.purchasePrice
    };
}

export function claim(){

}