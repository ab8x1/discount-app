'use client'
import styles from '../TableData/tableData.module.css'
import { memo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { DealType } from '@/types/deal';
  import {calcDataSet, mergeDeep, calcDynamicOptions} from './chartHelpers'
  import { defaultOptions, DrawLine } from './chartConsts';

  ChartJS.register(
    DrawLine,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );


export default memo(function ProfitsChart({
  deals
} : {
  deals: DealType[]
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
})