type tokens = "USDC";

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