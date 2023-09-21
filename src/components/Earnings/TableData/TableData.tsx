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
import { WalletState } from '@web3-onboard/core'

export default function TableData({
    currentPage,
    deals,
    address,
    wallet
} : {
    currentPage?: number,
    deals: PurchasedDeal[],
    address?: string,
    wallet: WalletState | null
}){
    const page = currentPage || 1;
    const router = useRouter();
    const orderedDeals = [...deals.filter(({date}) => !date?.redeemedAt) || []].reverse();

    useEffect(() => {
        orderedDeals.slice((page-1) * 5, page * 5).forEach(({id}) => {
            router.prefetch(
                `/offer/${id}?returnToPage=${page}`
            );
        })
    }, [page, deals])

    return(
        <div className={styles.tableWrapper} key={page}>
            <table id='tableData' className={styles.table} style={{minHeight: deals?.length < 1 ? '320px' : 'auto'}}>
                <thead>
                    <tr className={styles.tableRow}>
                        <th className={styles.tableHeader}>
                            Purchase Date
                        </th>
                        <th className={styles.tableHeader}>
                            Spent
                        </th>
                        <th className={styles.tableHeader}>
                            Fixed Return
                        </th>
                        <th className={styles.tableHeader}>
                            Claim Date
                        </th>
                        <th className={`${styles.tableHeader} brand`}>
                            Fixed Profit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderedDeals?.length > 0 ? orderedDeals.slice((page-1) * 5, page * 5).map( (deal, i) => {
                            const {id, amount, token, date, purchasePrice} = deal;
                            return(
                                <tr className={`${styles.tableRow} ${styles.interactiveTableRow}`} key={i} onClick={() => router.push(`/offer/${id}?returnToPage=${page}`)}>
                                    <td className={styles.tableData}>
                                        <span className={styles.lightData}>{timestampToDate(date.purchasedAt)}</span>
                                    </td>
                                    <td className={styles.tableData}>
                                        <div className={styles.amount}>
                                            <Image src="/tokens/USDC.svg" width={40} height={40} alt="ptUsdc"/>
                                            <div>
                                                <span className={styles.heavyData}>{purchasePrice}</span>
                                                <span className={styles.lightData}>{token}</span>
                                            </div>
                                        </div>
                                    </td>
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
                                                        fixedNumber(fixedProfit(deal), true, 2) || 0
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

                        }
                            )
                            :
                            <tr>
                                <td colSpan={10} style={{width: '100%', height:'100px', textAlign: 'center'}}>
                                    {
                                        <div className={styles.emptyTable}>
                                            <b style={{fontSize: '1.2rem'}}>No active deals</b>
                                            <DefaultButtonLink href={'/'}>Explore Deals</DefaultButtonLink>
                                        </div>
                                    }
                                </td>
                            </tr>
                    }
                </tbody>
                <TableFooter
                    page={page}
                    lastItemIndex={orderedDeals?.length}
                />
            </table>
        </div>
    )
}
