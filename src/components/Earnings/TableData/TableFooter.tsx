import styles from './tableData.module.css';


function TableFooter(){

    return(
        <tfoot>
            <tr style={{width: '100%'}} className={styles.tableRow}>
                <td colSpan={10}>
                    <div className={styles.tableFooterContent}>
                        <button className={`${styles.tableFooterButton} ${styles.buttonDisabled}`}>Previous</button>
                        Page 1 of 1
                        <button className={`${styles.tableFooterButton} ${styles.buttonDisabled}`}>Next</button>
                    </div>
                </td>
            </tr>
        </tfoot>
    )
}
export default TableFooter;