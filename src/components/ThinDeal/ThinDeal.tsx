"use client"
import { useEffect, useState } from 'react'
import styles from './thinDealStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { OfferType } from '@/types/offer'
import fixedNumber from '@/helpers/fixedNumber'
import timestampToDate from '@/helpers/timestampToDate'
import previewDiscountedAsset from '@/helpers/previewDiscountedAsset'
import LoadingValue from '../LoadingValue'

export default function ThinDeal({dealInfo} : {
    dealInfo: OfferType
}){
    const {
        id,
        token,
        background,
        isEnabled,
        date
    } = dealInfo
    const [discountedAsset, setDiscountedAsset] = useState<number | null>(null);
    const [clientMaturityDate, setClientMaturityDate] = useState<number | null>(null);

    useEffect(() => {
        setClientMaturityDate(date.end)
        const calculateDiscount = async () => {
            const previewAssets = await previewDiscountedAsset(dealInfo, 1);
            if(previewAssets !== null){
                const {userWillGet} = previewAssets;
                setDiscountedAsset(userWillGet);
            }

        }
        calculateDiscount();
    }, [])

    return(
        <Link href={`/offer/${id}`} className={styles.dealContainer} style={{background, pointerEvents: isEnabled ? 'all' : 'none'}}>
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
                <span>{clientMaturityDate ? timestampToDate(clientMaturityDate) : null}</span>
            </p>
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
