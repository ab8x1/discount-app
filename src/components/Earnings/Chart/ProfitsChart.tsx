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
    },
    elements:{
        point:{
            radius: 0,
        }
    },
    tension: 0.2,
    scales: {
        y: {
            grace: '5%',
            min: 0
            // ticks: {
            //     stepSize: 1
            // }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
  };

  const labels = ['1 May', '14 May', '28 May', '11 Jun', '25 Jun', '9 Jul'];

  export const data = {
    labels,
    datasets: [
      {
        // label: 'Profit $',
        data: [0,1,1,1,2,2],
        borderColor: '#1BE080',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 4
      },
    ],
  };

export default function ProfitsChart(){

    return(
        <div className={styles.chartWrapper}>
            <Line options={options} data={data} />
        </div>
    )
}
