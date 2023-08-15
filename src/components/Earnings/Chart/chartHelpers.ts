import { days_between } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";
import { PurchasedDeal } from "@/types/deal";
import { dateOptions } from "./chartConsts";
import { ChartOptions } from 'chart.js';

type NestedObject = { [key: string]: any };

export function mergeDeep(...objects: NestedObject[]) {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];

        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(...oVal);
        }
        else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal);
        }
        else {
          prev[key] = oVal;
        }
      });

      return prev;
    }, {});
  }

export const countDecimals = function (value: number): number {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}

export const calcDate = (daysBefore: number) => {
  const dateOffset = (24*60*60*1000) * daysBefore;
  const date = new Date();
  return date.setTime(date.getTime() - dateOffset);
}

export const calcDataSet = (deals: PurchasedDeal[]) => {
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

export const calcDynamicOptions = (data: {
  label: string,
  value: number
}[]) => {
  const maxValDataSet = Number(fixedNumber(Math.max(...data.map(({value}) => value)) * 1.25)) || 1;
  const roundTo = maxValDataSet/4 < 1 ? countDecimals(maxValDataSet) || 1 : 0;
  const stepSize = fixedNumber((maxValDataSet/4), false, roundTo, true) as number;
  const dynamicOptions: ChartOptions = {
    scales:{
      y:{
        ticks:{
          stepSize
        }
      },
      x: {
        ticks: {
          callback: function(val, index): string {
            // Hide every 2nd tick label
            return index % 2 === 0 && typeof val === 'number' ? this.getLabelForValue(val) : '';
          },
        },
      }
    }
  }
  return dynamicOptions;
}