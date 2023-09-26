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
    background,
    progressColor,
    isEnabled,
    date
} : ThinDeal){
    const discount = 100 - (discountedPrice / originalPrice) * 100;
    return(
        <Link href={`/deal/${id}`} className={styles.dealContainer} style={{background, pointerEvents: isEnabled ? 'all' : 'none'}}>
            <div className={`${styles.originalPrice} alignY`}>
                <Image src="/bar-chart.svg" width={25} height={25} alt='bar-chart'/>
                USDC Market Price
                ${fixedNumber(originalPrice, true, 2)}
            </div>
            <div className={`${styles.dealInfo} alignY`}>
                <Image src={`/tokens/${token}.svg`} width={86} height={86} alt={`${token} coin`} priority/>
                <div className='alignY' style={{gap: '10px'}}>
                    <Image src="/discount.svg" width={40} height={40} alt='discount' priority/>
                    <div>
                        Our Price
                        <p className={styles.discountPrice}>
                            ${fixedNumber(discountedPrice,false,2)}
                        </p>
                    </div>
                </div>
            </div>
            <p className={`${styles.claimDate} alignY`}>
                <span>Claim Date</span>
                <span>1 Jan 2024</span>
            </p>
            <span className={styles.progressBar} style={{background: progressColor.background}}>
                <span className={styles.line} style={{width: `${(Date.now() - date.start)/(date.end - date.start)*100}%`, background: progressColor.line}}/>
            </span>
            <span className={`alignY boxButton ${!isEnabled && 'disabledButton'}`}>
                {
                    isEnabled
                    ?
                        <>Buy {token} at <span className='brand'>{fixedNumber(discount, false, 1)}%</span> Discount</>
                    :
                        'Coming Soon'
                }
            </span>
        </Link>
    )
}
