import styles from './infoBoxStyles.module.css'
import InfoBox from './InfoBox'

export default function InfoBoxes(){

    return(
        <div id={styles.grid}>
            <InfoBox
                icon='coins-hand'
                iconBg="#1BE080"
                title='Live Earnings'
                value='$220.54'
            />
            <InfoBox
                icon='coins-hand'
                iconBg="#1BE080"
                title='Avg. 24hr Profits'
                value='$3.07'
            />
            <InfoBox
                icon='money'
                iconBg="#1BE080"
                title='Total Fixed Profits'
                value='$585'
            />
            <InfoBox
                icon='white-wallet'
                iconBg="#627EEA"
                title='Open Deals'
                value='5'
            />
        </div>
    )
}
