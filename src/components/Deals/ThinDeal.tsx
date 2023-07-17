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

    return(
        <div className={styles.dealContainer}>
            <div className={styles.dealContent}>
                <div className={`alignY ${styles.token}`}>
                    <Image src={`/tokens/${token}.svg`} width={44} height={44} alt='coin'/>
                    {token}
                </div>
                <div className={styles.prices}>
                    <div className={`alignY ${styles.discountPrice}`}>
                        <Image src="/tag.svg" width={18} height={18} alt='tag'/>
                        ${fixedNumber(discountedPrice, true, 2)}
                    </div>
                    <div className={styles.originalPrice}>
                        ${fixedNumber(originalPrice, true, 2)}
                    </div>
                </div>
            </div>
            <Link href={`/deal/${id}`} className={`alignY boxButton`}>
                Get USDC at {100 - (discountedPrice / originalPrice) * 100}% Discount
                <Image src="/arrow-circle-right.svg" width={24} height={24} alt='arrow circle right'/>
            </Link>
        </div>
    )
}
