'use client'
import styles from '@/components/Earnings/TableData/tableData.module.css';
import InfoBoxes from "@/components/Earnings/InfoBoxes";
import useUser from '@/hooks/useUser';
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
  const user = useUser();
  const deals = user?.deals || [];
  const address = user?.address;

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
        />
    </main>
)
  }