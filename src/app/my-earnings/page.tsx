'use client'
import styles from '@/components/Earnings/TableData/tableData.module.css';
import InfoBoxes from "@/components/Earnings/InfoBoxes";
import { DealType } from "@/types/deal";
import { useConnectWallet } from "@web3-onboard/react";
import { useState, useEffect } from "react";
import TableData from '@/components/Earnings/TableData/TableData';
import Link from 'next/link';
import Image from 'next/image';
import Chart from "@/components/Earnings/Chart/ProfitsChart"

export default function RootLayout({
  searchParams
} : {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page } = searchParams;
  const [deals, setDeals] = useState<DealType[]>([]);
  const [{ wallet }, connect] = useConnectWallet();
  const {address} = wallet?.accounts[0] ?? {};

  useEffect(() => {
      const DealTypes = JSON.parse(window.localStorage?.getItem('DealTypes') || "{}");
      const userDeals: DealType[] = DealTypes?.[address || 'unloggedDeals'];
      if(userDeals)
        setDeals(userDeals);
      else
          setDeals([]);
  }, [address]);

  return(
    <main className='container' style={{paddingBottom: '40px'}}>
        <InfoBoxes deals={deals}/>
        <div className={styles.dataGrid}>
            <Chart deals={deals} />
            <Link href="/" className={styles.exploreDeals}>
              <Image src="/explore-deals.svg" fill alt='explore deals' />
            </Link>
        </div>
        <TableData
          currentPage={Number(page)}
          deals={deals}
          address={address}
          wallet={wallet}
        />
    </main>
)
  }