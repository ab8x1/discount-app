import { DealType } from "@/types/deal"

export const exampleThinDeals: DealType[] = [
    {
        id: '0',
        token: 'USDT',
        discountedPrice: 0.32,
        originalPrice: 1,
        background: 'linear-gradient(180deg, #75B7FF 0%, #2775CA 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: true,
        date: {
            start: 1712527200000,
            end: 1728338400000
        },
        chainHexId: "0xaa36a7",
        curvePool: "0x080732d65987C5D5F9Aaa72999d7B0e02713aE72",
        IBTindexInCurvePool: 0,
        PTindexInCurvePool: 1
    }
]