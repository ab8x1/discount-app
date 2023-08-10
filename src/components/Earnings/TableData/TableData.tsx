'use client'
import { useEffect } from 'react'
import styles from './tableData.module.css'
import TableFooter from './TableFooter'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PurchasedDeal } from '@/types/deal'
import ConnectWallet from '@/components/Navbar/ConnectWallet'
import { DefaultButtonLink } from '@/components/Navbar/NavbarStyles'
import timestampToDate from "@/helpers/timestampToDate";

export default function TableData({
    deals,
    address
} : {
    deals: PurchasedDeal[],
    address?: string
}){
    const router = useRouter();
    useEffect(() => {
        Array.from(Array(3), (_, i) => {
            router.prefetch(`/edit/${i}`)
        })
    }, [])
    return(
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableRow}>
                        <th className={styles.tableHeader}>
                            Fixed Return
                        </th>
                        <th className={styles.tableHeader}>
                            Return Date
                        </th>
                        <th className={`${styles.tableHeader} brand`}>
                            Fixed Profit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deals?.length > 0 ? deals.map( ({amount, token, purchasePrice, date}, i) =>
                                <tr className={`${styles.tableRow} ${styles.interactiveTableRow}`} key={i} onClick={() => router.push(`/edit/${i}`)}>
                                    <td className={styles.tableData}>
                                        <div className={styles.amount}>
                                            <Image src="/tokens/USDC.svg" width={40} height={40} alt="ptUsdc"/>
                                            <div>
                                                <span className={styles.heavyData}>{amount}</span>
                                                <span className={styles.lightData}>{token}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.tableData}>
                                        <span className={styles.lightData}>{timestampToDate(date.maturity)}</span>
                                    </td>
                                    <td className={styles.tableData}>
                                        <div className={styles.amount}>
                                            <Image src="/tokens/USDC.svg" width={40} height={40} alt="ptUsdc"/>
                                            <div>
                                                <span className={`${styles.heavyData} brand`}>{amount - purchasePrice}</span>
                                                <span className={styles.lightData}>USDC</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan={3} style={{width: '100%', height:'100px', textAlign: 'center'}}>
                                    {
                                        <div className={styles.emptyTable}>
                                            {
                                                !address ?
                                                <>
                                                    <ConnectWallet/>
                                                </>
                                                :
                                                <>
                                                    <b style={{fontSize: '1.2rem'}}>No deals</b>
                                                    <DefaultButtonLink href={'/'}>Explore Deals</DefaultButtonLink>
                                                </>
                                            }
                                        </div>
                                    }
                                </td>
                            </tr>
                    }
                </tbody>
                <TableFooter/>
            </table>
        </div>
    )
}
