import { ThinDealType } from "@/types/deal"

export const exampleThinDeals: ThinDealType[] = [
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
        }
    }
]