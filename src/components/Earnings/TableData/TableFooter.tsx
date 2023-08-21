import { Dispatch, SetStateAction } from 'react';
import styles from './tableData.module.css';
import Link from 'next/link';


function TableFooter({
    page,
    lastItemIndex,
} : {
    page: number,
    lastItemIndex: number,
}){

    return(
        <tfoot>
            <tr style={{width: '100%'}} className={styles.tableRow}>
                <td colSpan={10}>
                    <div className={styles.tableFooterContent}>
                        <Link
                            href={`/my-earnings?page=${page - 1}`}
                            className={`${styles.tableFooterButton} ${page <= 1 ? styles.buttonDisabled : ''}`}
                        >
                            Previous
                        </Link>
                        Page {page} of {Math.ceil(lastItemIndex/5) || 1}
                        <Link
                            href={`/my-earnings?page=${page + 1}`}
                            className={`${styles.tableFooterButton} ${lastItemIndex <= page * 5 ? styles.buttonDisabled : ''}`}
                        >
                            Next
                        </Link>
                    </div>
                </td>
            </tr>
        </tfoot>
    )
}
export default TableFooter;