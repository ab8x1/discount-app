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
        token: 'GHO',
        tokenImgUrl: '/tokens/GHO.svg',
        background: 'linear-gradient(90deg, rgba(120, 117, 221, 1) 0%, rgba(127, 124, 212, 1) 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: true,
        date: {
            start: 0,
            end: 1735948806000
        },
        ptAddress: "0x95590e979a72b6b04d829806e8f29aa909ed3a86",
        underlyingTokenAddress: "0x08bdd4F0046123AdC2466495775fF02255694a16",
        chainName: "Arbitrum",
        chainHexId: "0xa4b1",
        chainRpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC as string,
        curvePool: "0x39E6Af30ea89034D1BdD2d1CfbA88cAF8464Fa65",
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
    },
    {
        id: '3',
        token: 'GHO',
        tokenImgUrl: '/tokens/GHO.svg',
        background: 'linear-gradient(90deg, rgba(120, 117, 221, 1) 0%, rgba(127, 124, 212, 1) 100%)',
        progressColor: {
            background: '#B9DAFF',
            line: '#58A8FF'
        },
        isEnabled: true,
        date: {
            start: 0,
            end: 1732492824000
        },
        ptAddress: "0xc7d669e7cc521a6676b20e209b3a49a1e64856f1",
        underlyingTokenAddress: "0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f",
        chainName: "Ethereum",
        chainHexId: "0x1",
        chainRpcUrl: process.env.NEXT_PUBLIC_MAINNET_URL as string,
        curvePool: "0xe7ad3016d46E538C9Ca87e5071C561A73eD1c98c",
    }
]