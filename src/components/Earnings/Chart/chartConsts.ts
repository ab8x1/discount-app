import { ChartOptions } from 'chart.js';

export const defaultOptions: ChartOptions = {
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
    scales: {
        y: {
            title: {
              display: true,
              text: 'Profits in $',
              font: {
                size: 14,
                weight: '600'
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

export const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
};