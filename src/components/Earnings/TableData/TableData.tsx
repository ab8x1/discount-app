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
import { useConnectWallet } from '@web3-onboard/react'

export default function TableData({
    page
} : {
    page: number,
}){
    const [deals, setDeals] = useState<PurchasedDeal[]>([]);
    const [{ wallet }, connect] = useConnectWallet();
    const {address} = wallet?.accounts[0] ?? {};

    useEffect(() => {
        if(address){
            const purchasedDeals = JSON.parse(window.localStorage?.getItem('purchasedDeals') || "{}");
            const userDeals = purchasedDeals[address] || [];
            setDeals(userDeals);
        }
        else
            setDeals([]);
    }, [address])
    const router = useRouter();
    useEffect(() => {
        deals.slice((page-1) * 5, page * 5).forEach(({id}) => {
            router.prefetch(
                `/offer/${id}`
            );
        })
    }, [page, deals])
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
                        deals?.length > 0 ? deals.slice((page-1) * 5, page * 5).map( ({id, amount, token, purchasePrice, date}, i) =>
                                <tr className={`${styles.tableRow} ${styles.interactiveTableRow}`} key={i} onClick={() => router.push(`/offer/${id}`)}>
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
                                                <span className={`${styles.heavyData} brand`}>{fixedNumber(amount - purchasePrice, true, 2)}</span>
                                                <span className={styles.lightData}>{token}</span>
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
                <TableFooter
                    page={page}
                    lastItemIndex={deals.length}
                />
            </table>
        </div>
    )
}
