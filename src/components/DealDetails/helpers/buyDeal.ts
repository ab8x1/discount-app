import { DealDetailsType } from "../DetailsTypes";
import { PurchasedDeal } from "@/types/deal";
import { v4 as uuidv4 } from 'uuid';

export default function buyDeal(
    dealDetails: DealDetailsType,
    amount: number,
    walletAddress?: string,
){
    const {date, discount, earn, reedem, roi, token} = dealDetails;
    const newPurchase: PurchasedDeal = {
        id: uuidv4(),
        amount: reedem,
        discount,
        purchasePrice: amount,
        token,
        date: {
            purchasedAt: Date.now(),
            maturity: date.end
        }
    }
    const purchasedDeals = JSON.parse(window.localStorage?.getItem('purchasedDeals') || "{}");
    window.localStorage.setItem('purchasedDeals', JSON.stringify({
        ...purchasedDeals,
        [walletAddress || 'unloggedDeals']: [
            ...purchasedDeals?.[walletAddress || 'unloggedDeals'] || [],
            newPurchase
        ]
    }))
    return newPurchase.id;
}