'use client'
import styles from './tableData.module.css'
import TableFooter from './TableFooter'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function TableData(){
    const router = useRouter();
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
                        Array.from(Array(5), (_, i) =>
                            <tr className={`${styles.tableRow} ${styles.interactiveTableRow}`} key={i} onClick={() => router.push(`/edit/${i}`)}>
                                <td className={styles.tableData}>
                                    <div className={styles.amount}>
                                        <Image src="/tokens/USDC.svg" width={40} height={40} alt="ptUsdc"/>
                                        <div>
                                            <span className={styles.heavyData}>1030</span>
                                            <span className={styles.lightData}>USDC</span>
                                        </div>
                                    </div>
                                </td>
                                <td className={styles.tableData}>
                                    <span className={styles.lightData}>14 Jun 2024</span>
                                </td>
                                <td className={styles.tableData}>
                                    <div className={styles.amount}>
                                        <Image src="/tokens/USDC.svg" width={40} height={40} alt="ptUsdc"/>
                                        <div>
                                            <span className={`${styles.heavyData} brand`}>30.00</span>
                                            <span className={styles.lightData}>USDC</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                <TableFooter/>
            </table>
        </div>
    )
}
