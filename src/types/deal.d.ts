export type tokens = "USDT" | "ETH" | "GHO";

export type DealType = {
    id: string,
    token: tokens,
    background: string,
    progressColor: {
        background: string,
        line: string
    },
    isEnabled: boolean,
    date: {
        start: number,
        end: number
    },
    chainHexId: string,
    curvePool: string,
    IBTindexInCurvePool: 0 | 1,
    PTindexInCurvePool: 0 | 1
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