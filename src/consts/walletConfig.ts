import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { CommonPositions } from '@web3-onboard/core/dist/types';

const desktopPosition: CommonPositions = 'topRight';
const mobilePosition: CommonPositions = 'bottomRight';

const injected = injectedModule();

export const walletConfig = {
  wallets: [injected],
  chains: [
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: process.env.NEXT_PUBLIC_GOERLI_URL
    }
  ],
  appMetadata: {
    name: "Discount Finance",
    icon: '/logo.svg',
    description: "Discount Finance App",
  },
  connect: {
    autoConnectLastWallet: false
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