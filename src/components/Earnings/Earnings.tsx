import InfoBoxes from "./InfoBoxes";
import TableData from "./TableData";
import Chart from './Chart/ProfitsChart'
import styles from './TableData/tableData.module.css';

export default function Earnings(){

    return(
        <>
            <InfoBoxes/>
            <div className={styles.dataGrid}>
                <TableData/>
                <Chart/>
            </div>
        </>
    )
}
