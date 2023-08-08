import styles from './infoBoxStyles.module.css'
import Image from 'next/image'
import { InfoBoxType } from '../EarningTypes'

export default function InfoBox({
    icon,
    iconBg,
    title,
    value
} : InfoBoxType){

    return(
        <div className={styles.infoBox}>
            <div className={styles.icon} style={{background: iconBg}}>
                <Image src={`/${icon}.svg`} width={22} height={22} alt={title} priority/>
            </div>
            <p>{title}</p>
            <span>{value}</span>
        </div>
    )
}
