import styles from './infoBoxStyles.module.css'
import InfoBox from './InfoBox'
import { PurchasedDeal } from '@/types/deal'
import {currentValue} from '@/helpers/calculateProfits'
import fixedNumber from '@/helpers/fixedNumber'
import { RefreshValue } from '@/helpers/calculateProfits'
import { days_between } from '@/helpers/calculateProfits'

export default function InfoBoxes({
    deals
} : {
    deals: PurchasedDeal[],
}){

    return(
        <div id={styles.grid}>
            <InfoBox
                icon='coins-hand'
                iconBg="#1BE080"
                title='Live Earnings'
                value={
                    deals?.length > 0 ?
                    <>
                        $
                        <RefreshValue
                            updateFunction={() =>
                                deals?.reduce((acc, deal) => acc + currentValue(deal.amount - deal.purchasePrice, deal.date.purchasedAt, deal.date.maturity), 0)
                            }
                            roundTo={8}
                        />
                    </>
                    : '$0'
                }
            />
            <InfoBox
                icon='coins-hand'
                iconBg="#1BE080"
                title='Avg. 24hr Profits'
                value={`$${
                    fixedNumber(deals?.reduce((acc, deal) => acc + ((deal.amount - deal.purchasePrice) / days_between(deal.date.purchasedAt, deal.date.maturity)), 0) || 0)
                }`}
            />
            <InfoBox
                icon='money'
                iconBg="#1BE080"
                title='Total Fixed Profits'
                value={`$${fixedNumber(deals?.reduce((acc, deal) => acc + deal.amount - deal.purchasePrice, 0) || 0)}`}
            />
            <InfoBox
                icon='white-wallet'
                iconBg="#627EEA"
                title='Open Deals'
                value={deals?.length.toString()}
            />
        </div>
    )
}
