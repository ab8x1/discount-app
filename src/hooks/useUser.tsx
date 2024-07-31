'use client'
import { createContext, useContext, FC, ReactNode, useEffect, useState } from 'react';
import { useConnectWallet, useSetChain } from "@web3-onboard/react"
import { BrowserProvider, JsonRpcSigner } from 'ethers';

export type UserType = {
  address: string,
  provider: BrowserProvider,
  signer: JsonRpcSigner
}

const UserContext = createContext<UserType | null>(null);

const useUser = () => useContext(UserContext);

export const UserProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [{ wallet }] = useConnectWallet();
  const [{chains, connectedChain}] = useSetChain();
  const [user, setUser] = useState<UserType | null>(null);
  console.log(chains);
  console.log(connectedChain);
  useEffect(() => {
      const getUserData = async() => {
        console.log("Update User Data");
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
