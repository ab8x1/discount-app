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

//calculate the decimals of a number
export const countDecimals = function (value: number): number {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}

const begginOfTheDay = (date: number) =>  new Date(date).setUTCHours(0,0,0,0);
const endOfTheDay = (date: number) =>  new Date(date).setUTCHours(23,59,59,999);

export const calcDate = (days: number, before = true) => {
  const dateOffset = (24*60*60*1000) * days;
  const date = new Date();
  return date.setTime(before ? date.getTime() - dateOffset : date.getTime() + dateOffset);
}

const calcProfitsAtDay = (deals: PurchasedDeal[], day: number) => fixedNumber(
  deals?.reduce(
    (acc, deal) => {
      const redeemedAt = deal.date?.redeemedAt;
      let profitsAtDay = 0;
      if(
          endOfTheDay(day) > deal.date.purchasedAt &&
          (!redeemedAt || (redeemedAt && day < redeemedAt))
        ){
        profitsAtDay = ((deal.amount - deal.purchasePrice) / days_between(deal.date.purchasedAt, deal.date.maturity));
      }
      return acc + profitsAtDay
    }
  , 0)
|| 0)

//calculate the data set for label
export const calcDataSet = (deals: PurchasedDeal[]) => {
  //check when the first earnings were made
  const earnsStart = begginOfTheDay(Math.min(...deals.map(({date}) => date.purchasedAt)));
  let daysBetweenEarnStart = days_between(earnsStart || Date.now(), begginOfTheDay(Date.now()));
  daysBetweenEarnStart = daysBetweenEarnStart < 6 ? 6 : Math.ceil(daysBetweenEarnStart);

  return Array.from(Array(daysBetweenEarnStart).keys()).reverse().map(daysBefore => {
    const day = calcDate(daysBefore);
    const profitsAtDay = calcProfitsAtDay(deals, day);
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
          stepSize,
        }
      },
      x: {
        ticks: {
          maxTicksLimit: 4,
      }
      }
    }
  }
  return dynamicOptions;
}