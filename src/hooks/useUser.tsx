'use client'
import { createContext, useContext, FC, ReactNode, useEffect, useState } from 'react';
import { useConnectWallet, useSetChain } from "@web3-onboard/react"
import { BrowserProvider, JsonRpcSigner, Contract } from 'ethers';
import { discountContractAddress } from '@/consts/globalConsts';
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import { DealType } from '@/types/deal';
const discountV1ABI = DISCOUNTV1_ABI.abi;

export type UserType = {
  address: string,
  provider: BrowserProvider,
  signer: JsonRpcSigner,
  currentChain?: string,
  discountContract: Contract,
  deals: DealType[],
  updateUserDeals: (deal: DealType, updateId?: string) => void,
}

const UserContext = createContext<UserType | null>(null);

const useUser = () => useContext(UserContext);

export const UserProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [{ wallet }] = useConnectWallet();
  const [{chains, connectedChain}] = useSetChain();
  const [user, setUser] = useState<UserType | null>(null);
  const userAddress = wallet?.accounts[0].address;
  const currentChain = connectedChain?.id;

  const getUserDeals = async (address: string) => {
    try{
      const queryString = new URLSearchParams({user: address}).toString();
      const userDealsRes = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/getUserDeals?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const userDeals: DealType[] = await userDealsRes.json();
      if(userDeals){
        setUser((prevSt: UserType | null) => prevSt ? {...prevSt, deals: userDeals} : null);
      }
    }
    catch(e){
      console.log("Error in getUserDeals:", e);
    }
  }

  const updateUserDeals = (deal: DealType, updateId?: string) => {
    console.log("updateUserDeals");
    setUser(
      (prevUser: UserType | null) => {
        if(prevUser){
          if(updateId){
            const dealsToUpdate = [...prevUser.deals];
            const updatedDealIndex = dealsToUpdate.findIndex(deal => deal.id === updateId);
            dealsToUpdate[updatedDealIndex] = deal;
            return {...prevUser, deals: dealsToUpdate}
          }
          else
            return {...prevUser, deals: [...prevUser.deals, deal]}
        }
        else
          return null
      }
    )
  }

  useEffect(() => {
      const getUserData = async() => {
        if(wallet && userAddress){
          const ethersProvider = new BrowserProvider(wallet.provider, 'any');
          const signer = await ethersProvider.getSigner();
          const discountContract = new Contract(discountContractAddress, discountV1ABI, signer);
          setUser({
            address: userAddress,
            provider: ethersProvider,
            signer,
            currentChain,
            discountContract,
            deals: [],
            updateUserDeals: updateUserDeals,
          });
          getUserDeals(userAddress); //load user deals from db after signing in with wallet
        }
        else
          setUser(null)
    }
    getUserData();
  }, [userAddress, currentChain]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export default useUser;
