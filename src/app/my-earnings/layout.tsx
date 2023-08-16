'use client'
import styles from '@/components/Earnings/TableData/tableData.module.css';
import InfoBoxes from "@/components/Earnings/InfoBoxes";
import { PurchasedDeal } from "@/types/deal";
import { useConnectWallet } from "@web3-onboard/react";
import { useState, useEffect } from "react";
import Chart from "@/components/Earnings/Chart/ProfitsChart"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) { console.log('my-earnings layout');
  const [deals, setDeals] = useState<PurchasedDeal[]>([]);
  const [{ wallet }, connect] = useConnectWallet();
  const {address} = wallet?.accounts[0] ?? {};

  useEffect(() => {
      if(address){
          const purchasedDeals = JSON.parse(window.localStorage?.getItem('purchasedDeals') || "{}");
          const userDeals = purchasedDeals[address];
          setDeals(userDeals);
      }
      else
          setDeals([]);
  }, [address]);

  return(
    <main className='container'>
        <InfoBoxes deals={deals}/>
        <div className={styles.dataGrid}>
            {children}
            <Chart deals={deals} />
        </div>
    </main>
)
  }