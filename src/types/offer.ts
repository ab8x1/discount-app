export type OfferType = {
    id: string,
    token: string,
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
    underlyingTokenAddress: string,
    chainName: string,
    chainHexId: string,
    chainRpcUrl: string,
    curvePool: string,
    IBTindexInCurvePool: 0 | 1,
    PTindexInCurvePool: 0 | 1
}