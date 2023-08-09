export type tokens = "USDC";

export type ThinDeal = {
    id: string,
    token: tokens,
    originalPrice: number,
    discountedPrice: number,
    date: {
        start: number,
        end: number
    }
}

export type PurchasedDeal = {
    id: string,
    token: tokens,
    amount: number,
    purchasePrice: number,
    discount: number,
    date: {
        purchasedAt: number,
        maturity: number,
        redeemedAt?: number
    },
}