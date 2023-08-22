import styles from './tableData.module.css';
import { useRouter } from 'next/navigation'


function TableFooter({
    page,
    lastItemIndex,
} : {
    page: number,
    lastItemIndex: number,
}){
    const router = useRouter();
    return(
        <tfoot>
            <tr style={{width: '100%'}} className={styles.tableRow}>
                <td colSpan={10}>
                    <div className={styles.tableFooterContent}>
                        <button
                            onClick={() =>  router.push(window.location.pathname + "?" + `page=${page - 1}#tableData`)}
                            className={`${styles.tableFooterButton} ${page <= 1 ? styles.buttonDisabled : ''}`}
                        >
                            Previous
                        </button>
                        Page {page} of {Math.ceil(lastItemIndex/5) || 1}
                        <button
                            onClick={() =>  router.push(window.location.pathname + "?" + `page=${page + 1}#tableData`)}
                            className={`${styles.tableFooterButton} ${lastItemIndex <= page * 5 ? styles.buttonDisabled : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </td>
            </tr>
        </tfoot>
    )
}
export default TableFooter;