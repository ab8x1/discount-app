'use client'
import styles from '@/components/Earnings/TableData/tableData.module.css';
import InfoBoxes from "@/components/Earnings/InfoBoxes";
import { PurchasedDeal } from "@/types/deal";
import { useConnectWallet } from "@web3-onboard/react";
import { useState, useEffect } from "react";
import TableData from '@/components/Earnings/TableData/TableData';

import Chart from "@/components/Earnings/Chart/ProfitsChart"

export default function RootLayout({
  searchParams
} : {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page } = searchParams;
  const [deals, setDeals] = useState<PurchasedDeal[]>([]);
  const [{ wallet }, connect] = useConnectWallet();
  const {address} = wallet?.accounts[0] ?? {};

  useEffect(() => {
      const purchasedDeals = JSON.parse(window.localStorage?.getItem('purchasedDeals') || "{}");
      const userDeals = purchasedDeals?.[address || 'unloggedDeals'];
      if(userDeals)
        setDeals(userDeals);
      else
          setDeals([]);
  }, [address]);

  return(
    <main className='container'>
        <InfoBoxes deals={deals}/>
        <div className={styles.dataGrid}>
            <TableData
              currentPage={Number(page)}
              deals={deals}
              address={address}
              wallet={wallet}
            />
            <Chart deals={deals} />
        </div>
    </main>
)
  }