import { ThinDeal } from "@/types/deal"

export const exampleThinDeals: ThinDeal[] = [
    {
        id: '0',
        token: 'USDC',
        discountedPrice: 0.955,
        originalPrice: 1,
        background: 'linear-gradient(180deg, #75B7FF 0%, #2775CA 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: true,
        date: {
            start: 1672598910000,
            end: 1723204039000
        }
    },
    {
        id: '1',
        token: 'ETH',
        discountedPrice: 1600,
        originalPrice: 1685,
        background: 'linear-gradient(180deg, #8B6DCD 0%, #627EEA 100%)',
        progressColor: {
            background: '#E9D7FE',
            line: '#9E77ED'
        },
        isEnabled: false,
        date: {
            start: 1672598910000,
            end: 1754740039000
        }
    },
    {
        id: '2',
        token: 'DAI',
        discountedPrice: 0.95,
        originalPrice: 1,
        background: 'linear-gradient(180deg, #FFC566 0%, #E08E0B 100%)',
        progressColor: {
            background: '#FFEFCF',
            line: '#EF9400'
        },
        isEnabled: false,
        date: {
            start: 1672598910000,
            end: 1786276039000
        }
    },
]