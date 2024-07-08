export type tokens = "USDC" | "ETH" | "GHO";

export type ThinDealType = {
    id: string,
    token: tokens,
    originalPrice: number,
    discountedPrice: number,
    background: string,
    progressColor: {
        background: string,
        line: string
    },
    isEnabled: boolean,
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