import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { CommonPositions } from '@web3-onboard/core/dist/types';

const desktopPosition: CommonPositions = 'topRight';
const mobilePosition: CommonPositions = 'bottomRight';

const injected = injectedModule();

export const walletConfig = {
  // https://explorer.blocknative.com/account
  apiKey: process.env.NEXT_PUBLIC_BLOCKNATIVE_KEY,
  wallets: [injected],
  chains: [
    {
      id: '0xaa36a7',
      token: 'ETH',
      label: 'Sepolia',
      rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC
    }
  ],
  appMetadata: {
    name: "Discount Finance",
    icon: '/logo.svg',
    description: "Discount Finance App",
  },
  connect: {
    autoConnectLastWallet: true
  },
  accountCenter: {
    desktop: {
      enabled: true,
      minimal: true,
      position: desktopPosition
    },
    mobile: {
      minimal: true,
      enabled: true,
      position: mobilePosition,
    }
  }
}

export const web3Onboard = init(walletConfig);