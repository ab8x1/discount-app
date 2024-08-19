export type tokens = "USDT" | "ETH" | "GHO";

export type OfferType = {
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
    ptAddress: string,
    chainHexId: string,
    curvePool: string,
    IBTindexInCurvePool: 0 | 1,
    PTindexInCurvePool: 0 | 1
}