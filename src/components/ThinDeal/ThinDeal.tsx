"use client"
import { useEffect, useState } from 'react'
import styles from './thinDealStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { DealType } from '@/types/deal'
import fixedNumber from '@/helpers/fixedNumber'
import timestampToDate from '@/helpers/timestampToDate'
import previewDiscountedAsset from '@/helpers/previewDiscountedAsset'
import ReactLoading from 'react-loading';
import LoadingValue from '../LoadingValue'

export default function ThinDeal({dealInfo} : {
    dealInfo: DealType
}){
    const {
        id,
        token,
        background,
        progressColor,
        isEnabled,
        date
    } = dealInfo
    const [discountedAsset, setDiscountedAsset] = useState<number | null>(null);

    useEffect(() => {
        const calculateDiscount = async () => {
            const {userWillGet} = await previewDiscountedAsset(dealInfo, 1);
            setDiscountedAsset(userWillGet);
        }
        calculateDiscount();
    }, [])

    return(
        <Link href={`/deal/${id}`} className={styles.dealContainer} style={{background, pointerEvents: isEnabled ? 'all' : 'none'}}>
            <div className={`${styles.originalPrice} alignY`}>
                <Image src="/bar-chart.svg" width={25} height={25} alt='bar-chart'/>
                {token} Market Price
                $1
            </div>
            <div className={`${styles.dealInfo} alignY`}>
                <Image src={`/tokens/${token}.svg`} width={86} height={86} alt={`${token} coin`} priority/>
                <div className='alignY' style={{gap: '10px'}}>
                    <Image src="/discount.svg" width={40} height={40} alt='discount' priority/>
                    <div>
                        Our Price
                        <div className={styles.discountPrice}>
                            $
                            <LoadingValue
                                isLoading={!discountedAsset}
                                value={fixedNumber(1 / (discountedAsset || 1), false, 2)}
                                loaderColor='white'
                                loaderHeight={30}
                                loaderWidth={30}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <p className={`${styles.claimDate} alignY`}>
                <span>Claim Date</span>
                <span>{timestampToDate(date.end)}</span>
            </p>
            <span className={styles.progressBar} style={{background: progressColor.background}}>
                <span className={styles.line} style={{width: `${(Date.now() - date.start)/(date.end - date.start)*100}%`, background: progressColor.line}}/>
            </span>
            <div className={`alignY boxButton ${!isEnabled && 'disabledButton'}`}>
                {
                    isEnabled
                    ?
                        <>
                            Buy {token} at
                            <div className='brand'>
                                <LoadingValue
                                    isLoading={!discountedAsset}
                                    value={
                                        `${fixedNumber(((1 - (1 / (discountedAsset || 1))) / 1) * 100, false, 0)}%`
                                    }
                                    loaderColor='green'
                                    loaderHeight={19}
                                    loaderWidth={25}
                                />
                            </div>
                            Discount
                        </>
                    :
                        'Coming Soon'
                }
            </div>
        </Link>
    )
}
