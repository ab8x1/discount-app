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
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { PurchasedDeal } from '@/types/deal';
  import fixedNumber from '@/helpers/fixedNumber';
  import { days_between } from '@/helpers/calculateProfits';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  );

  export const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Avg. 24hr Profits',
      },
      tooltip: {
        // enabled: false,
        padding: 10,
      }
    },
    elements:{
        point:{
            // radius: 0,
        }
    },
    tension: 0.2,
    scales: {
        y: {
            title: {
              display: true,
              text: 'Profits in $',
              font: {
                size: 14
              }
            },
            min: 0,
            ticks: {
              autoSkip: false,
              font: {
                  size: 16,
              }
          }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
  };

const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
};

const calcDate = (daysBefore: number) => {
  const dateOffset = (24*60*60*1000) * daysBefore;
  const date = new Date();
  return date.setTime(date.getTime() - dateOffset);
}

const calcDataSet = (deals: PurchasedDeal[]) => {
  return Array.from(Array(6).keys()).reverse().map(daysBefore => {
    const day = calcDate(daysBefore);
    const profitsAtDay = fixedNumber(
      deals?.reduce(
        (acc, deal) => {
          const redeemedAt = deal.date?.redeemedAt;
          let profitsAtDay = 0;
          if(
              new Date(day).setUTCHours(23,59,59,999) > deal.date.purchasedAt &&
              (!redeemedAt || (redeemedAt && day < redeemedAt))
            ){
            profitsAtDay = ((deal.amount - deal.purchasePrice) / days_between(deal.date.purchasedAt, deal.date.maturity));
          }
          return acc + profitsAtDay
        }
      , 0)
    || 0)
    return {
      label: new Date(day).toLocaleDateString("en-GB", dateOptions),
      value: Number(profitsAtDay)
    }
  })
}

export default function ProfitsChart({
  deals
} : {
  deals: PurchasedDeal[]
} ){
  const data = calcDataSet(deals);
  const maxValDataSet = Number(fixedNumber(Math.max(...data.map(({value}) => value)) / 3)) || 0.3;
  const stepSize = maxValDataSet + maxValDataSet*0.01;
    return(
        <div className={styles.chartWrapper}>
            <Line
              options={{
                ...options,
                scales: {
                  ...options.scales,
                  y: {
                    ...options.scales.y,
                    ticks: {
                      stepSize
                    }
                  }
                }
              }}
              data={{
              labels: data.map(({label}) => label),
              datasets: [
                {
                  data: data.map(({value}) => value),
                  borderColor: '#1BE080',
                  borderWidth: 4
                },
              ],
            }} />
        </div>
    )
}
