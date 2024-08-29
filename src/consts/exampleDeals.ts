import { OfferType } from "@/types/offer"

export const exampleOffers: OfferType[] = [
    {
        id: '0',
        token: 'USDT',
        tokenImgUrl: "/tokens/USDT.svg",
        background: 'linear-gradient(180deg, #75B7FF 0%, #2775CA 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: false,
        date: {
            start: 1712527200000,
            end: 1728338400000
        },
        ptAddress: "0x15d5b6B2ed96a8926872aa742Ef658b15B3C7951",
        underlyingTokenAddress: "0x0372cE7418865080D82d0B6677a692a2c045e4D3",
        chainName: "Sepolia",
        chainHexId: "0xaa36a7",
        chainRpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC as string,
        curvePool: "0x080732d65987C5D5F9Aaa72999d7B0e02713aE72",
    },
    {
        id: '1',
        token: 'DAI',
        tokenImgUrl: '/tokens/DAI.svg',
        background: 'linear-gradient(180deg, #FFC566 0%, #E08E0B 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: true,
        date: {
            start: 0,
            end: 1727906400000
        },
        ptAddress: "0x458e662aa15a3E338A9b1f9668e2CCb302Fd4340",
        underlyingTokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        chainName: "Arbitrum",
        chainHexId: "0xa4b1",
        chainRpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC as string,
        curvePool: "0xf5650B7dd5216fCc6cfa5C009FFd147eD8254f37",
    },
    {
        id: '2',
        token: 'USDC',
        tokenImgUrl: '/tokens/USDC.svg',
        background: 'linear-gradient(180deg, #75B7FF 0%, #2775CA 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: false,
        date: {
            start: 0,
            end: 1727188151000
        },
        ptAddress: "0x054DB0e66eD52D554bC549Df83ABb632555d4D9B",
        underlyingTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        chainName: "Arbitrum",
        chainHexId: "0xa4b1",
        chainRpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC as string,
        curvePool: "0xDc2B69Aa3C13cab8010B8cc3c4E838B2b005089f",
    }
]