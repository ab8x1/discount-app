import { Dispatch, SetStateAction } from 'react';
import styles from './tableData.module.css';


function TableFooter({
    page,
    lastItemIndex,
    setPage
} : {
    page: number,
    lastItemIndex: number,
    setPage: Dispatch<SetStateAction<number>>
}){

    return(
        <tfoot>
            <tr style={{width: '100%'}} className={styles.tableRow}>
                <td colSpan={10}>
                    <div className={styles.tableFooterContent}>
                        <button
                            className={`${styles.tableFooterButton} ${page <= 1 ? styles.buttonDisabled : ''}`}
                            onClick={() => setPage(prevPage => prevPage - 1)}
                        >
                            Previous
                        </button>
                        Page {page} of {Math.ceil(lastItemIndex/5)}
                        <button
                            className={`${styles.tableFooterButton} ${lastItemIndex <= page * 5 ? styles.buttonDisabled : ''}`}
                            onClick={() => setPage(prevPage => prevPage + 1)}
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