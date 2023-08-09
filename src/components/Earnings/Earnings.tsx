'use client'
import { useEffect, useState } from "react";
import InfoBoxes from "./InfoBoxes";
import TableData from "./TableData";
import Chart from './Chart/ProfitsChart'
import styles from './TableData/tableData.module.css';
import { PurchasedDeal } from "@/types/deal";
import { useConnectWallet } from "@web3-onboard/react";

export default function Earnings(){
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
    }, [address])

    return(
        <>
            <InfoBoxes deals={deals}/>
            <div className={styles.dataGrid}>
                <TableData deals={deals} address={address}/>
                <Chart/>
            </div>
        </>
    )
}
