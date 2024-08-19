'use client'
import { createContext, useContext, FC, ReactNode, useEffect, useState } from 'react';
import { useConnectWallet, useSetChain } from "@web3-onboard/react"
import { BrowserProvider, JsonRpcSigner, JsonRpcProvider, Contract } from 'ethers';
import { discountContractAddress } from '@/consts/globalConsts';
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
const discountV1ABI = DISCOUNTV1_ABI.abi;

export type UserType = {
  address: string,
  provider: BrowserProvider,
  signer: JsonRpcSigner,
  discountContract: Contract
}

export const defaultProvider = new JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC);

const UserContext = createContext<UserType | null>(null);

const useUser = () => useContext(UserContext);

export const UserProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [{ wallet }] = useConnectWallet();
  const [{chains, connectedChain}] = useSetChain();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
      const getUserData = async() => {
        if(wallet){
          const ethersProvider = new BrowserProvider(wallet.provider, 'any');
          const signer = await ethersProvider.getSigner();
          const discountContract = new Contract(discountContractAddress, discountV1ABI, signer);
          setUser({
            address: wallet.accounts[0].address,
            provider: ethersProvider,
            signer,
            discountContract
          })
        }
        else
          setUser(null)
    }
    getUserData();
  }, [wallet])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export default useUser;
