import fixedNumber from '@/helpers/fixedNumber';
import { ChartOptions } from 'chart.js';
import { countDecimals, roundToFirstNonZeroDecimal } from './chartHelpers';

export const DrawLine = {
  id: 'uniqueid5',
  afterDraw: function (chart: any, easing: any) {
    if (chart?.tooltip?._active && chart?.tooltip?._active?.length) {
      const activePoint = chart.tooltip._active[0];
      const ctx = chart.ctx;
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#1BE080';
      ctx.stroke();
      ctx.restore();
    }
  }
};

export const defaultOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Avg. 24hr Profits',
        font: {
          size: 15,
        },
        padding: 20
      },
      tooltip: {
        padding: 10,
        boxHeight: 0,
        boxWidth: 0,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `${fixedNumber(value,false,5)} $`;
          },
        },
      }
    },
    elements:{
        point:{
            radius: 0,
        }
    },
    scales: {

        y: {
            title: {
              display: false,
            },
            min: 0,
            ticks: {
              callback: (value, index, ticks) => {
                let roundToDecimals = countDecimals(roundToFirstNonZeroDecimal(ticks[1].value));
                roundToDecimals = roundToDecimals < 2 ? 2 : roundToDecimals;
                const val = fixedNumber(value, true, roundToDecimals);
                return '$ ' + val + '  ';
              },
              autoSkip: false,
              font: {
                  size: 14,
                  weight: '400'
              },
          }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
              font: {
                size: 13,
                weight: '400'
              }
            }
        }
    }
  };

export const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
};