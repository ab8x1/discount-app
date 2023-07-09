'use client'
import { Web3OnboardProvider } from '@web3-onboard/react';
import { web3Onboard } from "@/consts/walletConfig"

export default function WalletProvider({
    children
}: {
    children: React.ReactNode
}){ console.log('Wallet Provider');
    return(
        <Web3OnboardProvider web3Onboard={web3Onboard}>
            {children}
        </Web3OnboardProvider>
    )
}