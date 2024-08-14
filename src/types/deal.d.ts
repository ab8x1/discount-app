export type DealType = {
    id: string,
    offerId: string,
    owner: string,
    token: string,
    amountBigIntStringified: string,
    amount: number,
    purchasePrice: number,
    discount: number,
    date: {
        purchasedAt: number,
        maturity: number,
        redeemedAt?: number
    },
}