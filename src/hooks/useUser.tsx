'use client'
import { createContext, useContext, FC, ReactNode, useEffect, useState } from 'react';
import { useConnectWallet, useSetChain } from "@web3-onboard/react"
import { BrowserProvider, JsonRpcSigner, JsonRpcProvider } from 'ethers';

export type UserType = {
  address: string,
  provider: BrowserProvider,
  signer: JsonRpcSigner
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
          const signer = await ethersProvider.getSigner()
          setUser({
            address: wallet.accounts[0].address,
            provider: ethersProvider,
            signer
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
