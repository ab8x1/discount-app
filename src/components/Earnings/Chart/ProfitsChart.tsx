'use client'
import styles from '../TableData/tableData.module.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ChartOptions,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { PurchasedDeal } from '@/types/deal';
  import fixedNumber from '@/helpers/fixedNumber';
  import {calcDataSet, countDecimals, mergeDeep, calcDynamicOptions} from './chartHelpers'
  import { defaultOptions } from './chartConsts';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  );


export default function ProfitsChart({
  deals
} : {
  deals: PurchasedDeal[]
} ){
  const data = calcDataSet(deals);
  const dynamicOptions = calcDynamicOptions(data);
  const options = mergeDeep(defaultOptions, dynamicOptions);
    return(
        <div className={styles.chartWrapper}>
            <Line
              options={options}
              data={{
              labels: data.map(({label}) => label),
              datasets: [
                {
                  data: data.map(({value}) => value),
                  borderColor: '#1BE080',
                  borderWidth: 4,
                  tension: 0.2,
                },
              ],
            }} />
        </div>
    )
}