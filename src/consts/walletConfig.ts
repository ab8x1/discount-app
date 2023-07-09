import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const accountCenterCommon = {
  enabled: true,
  minimal: true,
}

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
    name: "YieldFlipper",
    icon: '/logo.svg',
    description: "YieldFlipper App",
  },
  connect: {
    autoConnectLastWallet: false
  },
  accountCenter: {
    desktop: {
      ...accountCenterCommon,
    },
    mobile: {
      ...accountCenterCommon,
    }
  }
}

export const web3Onboard = init(walletConfig);