
export type DealType = {
    id: string,
    token: string,
    amount: number,
    purchasePrice: number,
    discount: number,
    date: {
        purchasedAt: number,
        maturity: number,
        redeemedAt?: number
    },
}