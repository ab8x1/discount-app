import styles from './thinDealStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ThinDeal } from '@/types/deal'
import fixedNumber from '@/helpers/fixedNumber'

export default function ThinDeal({
    id,
    token,
    originalPrice,
    discountedPrice,
} : ThinDeal){
    const discount = 100 - (discountedPrice / originalPrice) * 100;
    return(
        <div className={styles.dealContainer}>

            <div className={`alignY ${styles.discount}`}>
                {fixedNumber(discount, false, 1)}% Discount
            </div>

            <div className={`alignY ${styles.token}`}>
                <Image src={`/tokens/${token}.svg`} width={115} height={115} alt='coin' priority/>
            </div>

            <div className={styles.discountPrice}>
                ${fixedNumber(discountedPrice,false,2)}
            </div>

            <div className={styles.originalPrice}>
                ${fixedNumber(originalPrice, true, 2)}
            </div>

            <Link href={`/deal/${id}`} className={`alignY boxButton`}>
                Buy
            </Link>
        </div>
    )
}
