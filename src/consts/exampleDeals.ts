import { OfferType } from "@/types/offer"

export const exampleOffers: OfferType[] = [
    {
        id: '1', //arb
        token: 'fDAi', //arb
        tokenImgUrl: '/tokens/DAI.svg',
        background: 'linear-gradient(180deg, #FFC566 0%, #E08E0B 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: true,
        date: {
            start: 0,
            end: 1727906400000 //arb
        },
        ptAddress: "0x458e662aa15a3E338A9b1f9668e2CCb302Fd4340", //arb
        underlyingTokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", //arb
        chainName: "Arbitrum",
        chainHexId: "0xa4b1", //arb
        chainRpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC as string,
        curvePool: "0xf5650B7dd5216fCc6cfa5C009FFd147eD8254f37", //arb
        IBTindexInCurvePool: 0,
        PTindexInCurvePool: 1
    }
]