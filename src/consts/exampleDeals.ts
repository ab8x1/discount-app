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
        token: 'USDA',
        tokenImgUrl: '/tokens/USDA.svg',
        background: 'linear-gradient(180deg, #75B7FF 0%, #2775CA 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: true,
        date: {
            start: 0,
            end: 1748217638000
        },
        ptAddress: "0x3d1FD4382bB3B1fE9dAc005e77DeB7a9BFB3AA14",
        underlyingTokenAddress: "0x0000206329b97DB379d5E1Bf586BbDB969C63274",
        chainName: "Ethereum",
        chainHexId: "0x1",
        chainRpcUrl: process.env.NEXT_PUBLIC_MAINNET_URL as string,
        curvePool: "0xC6e949F57D365Fb73015d21A2D1a9DA93e938d52",
    }
]