import { memo, useState, useEffect } from 'react'
import styles from './infoBoxStyles.module.css'
import InfoBox from './InfoBox'
import { DealType } from '@/types/deal'
import {activeDailyProfit, fixedProfit, getTotalBalance} from '@/helpers/calculateProfits'
import fixedNumber from '@/helpers/fixedNumber'
import LoadingValue from '@/components/LoadingValue'

export default memo(function InfoBoxes({
    deals
} : {
    deals: DealType[],
}){
    const [totalBalnce, setTotalBalance] = useState<number>();
    useEffect(() => {
        const getBalance = async () => {
            const balance = await getTotalBalance(deals.filter(deal => !deal.date?.redeemedAt));
            setTotalBalance(balance);
        }
        getBalance();
    }, [deals]);

    return(
        <div id={styles.grid}>
            <InfoBox
                icon='coins-hand'
                iconBg="#1BE080"
                title='Total Balance'
                value={
                    deals?.length > 0 ?
                    totalBalnce === undefined ?
                    <LoadingValue
                        isLoading={true}
                        value=""
                        loaderColor="#1BE080"
                        loaderHeight={20}
                        loaderWidth={30}
                    />
                    : `$${fixedNumber(totalBalnce, false, 2)}`
                    : '$0'
                }
            />
            <InfoBox
                icon='coins-hand'
                iconBg="#1BE080"
                title='Avg. 24hr Profits'
                value={`$${
                    fixedNumber(
                        deals?.reduce(
                            (acc, deal) => acc + activeDailyProfit(deal)
                        , 0)
                    || 0)
                }`}
            />
            <InfoBox
                icon='money'
                iconBg="#1BE080"
                title='Total Fixed Profits'
                value={`$${fixedNumber(deals?.reduce(
                    (acc, deal) => acc + fixedProfit(deal)
                    , 0) || 0)}`
                }
            />
            <InfoBox
                icon='white-wallet'
                iconBg="#627EEA"
                title='Open Deals'
                value={deals?.filter(deal => !deal.date.redeemedAt)?.length.toString()}
            />
        </div>
    )
})
