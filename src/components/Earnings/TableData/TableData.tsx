'use client'
import { useEffect, useState } from 'react'
import styles from './tableData.module.css'
import TableFooter from './TableFooter'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PurchasedDeal } from '@/types/deal'
import ConnectWallet from '@/components/Navbar/ConnectWallet'
import { DefaultButtonLink } from '@/components/Navbar/NavbarStyles'
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from '@/helpers/fixedNumber'
import {  fixedProfit } from '@/helpers/calculateProfits'

export default function TableData({
    currentPage,
    deals,
    address
} : {
    currentPage?: number,
    deals: PurchasedDeal[],
    address?: string
}){
    const page = currentPage || 1;
    const router = useRouter();
    const orderedDeals = [...deals || []].reverse();

    useEffect(() => {
        orderedDeals.slice((page-1) * 5, page * 5).forEach(({id}) => {
            router.prefetch(
                `/offer/${id}`
            );
        })
    }, [page, deals])

    return(
        <div className={styles.tableWrapper} key={page}>
            <table id='tableData' className={styles.table} style={{minHeight: deals?.length < 1 ? '320px' : 'auto'}}>
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
                        deals?.length > 0 ? orderedDeals.slice((page-1) * 5, page * 5).map( ({id, amount, token, purchasePrice, date}, i) =>
                                <tr className={`${styles.tableRow} ${styles.interactiveTableRow}`} key={i} onClick={() => router.push(`/offer/${id}?returnToPage=${page}`)}>
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
                                                <span className={`${styles.heavyData} brand`}>
                                                    {/* calc deal profit - total fixed or reedemed */}
                                                    {
                                                        fixedNumber(fixedProfit(deals[i]), true, 2)
                                                    }
                                                </span>
                                                <span className={styles.lightData}>{token}</span>
                                            </div>
                                        </div>
                                    </td>
                                    {
                                        date?.redeemedAt &&
                                        <td className={styles.closedIndicator}>
                                            Closed
                                        </td>
                                    }
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
                <TableFooter
                    page={page}
                    lastItemIndex={deals?.length}
                />
            </table>
        </div>
    )
}
