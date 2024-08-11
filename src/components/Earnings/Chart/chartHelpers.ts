import { days_between } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";
import { DealType } from "@/types/deal";
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

//calculate the decimals of a number e.g 0.0002300020 = 10
export const countDecimals = function (value: number): number {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}

//return number with only relevant decimals e.g 0.0002300020 = 0.00023
export const relevantDecimals = function(value: number): number {
  return Number(value.toFixed(1 - Math.floor(Math.log10(value))));
}

export function roundToFirstNonZeroDecimal(number: number) {
  const epsilon = 1e-10; // A small value to handle precision issues

  if (Math.abs(number) < epsilon) {
    return 0;
  }

  let multiplier = 1;
  while (Math.abs(number) * multiplier < 1) {
    multiplier *= 10;
  }

  return Math.round(number * multiplier) / multiplier;
}

const begginOfTheDay = (date: number) =>  new Date(date).setUTCHours(0,0,0,0);
const endOfTheDay = (date: number) =>  new Date(date).setUTCHours(23,59,59,999);

export const calcDate = (days: number, before = true) => {
  const dateOffset = (24*60*60*1000) * days;
  const date = new Date();
  return date.setTime(before ? date.getTime() - dateOffset : date.getTime() + dateOffset);
}

const calcProfitsAtDay = (deals: DealType[], day: number) => fixedNumber(
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
|| 0, false, 5, true)

//calculate the data set for label
export const calcDataSet = (deals: DealType[]) => {
  const begginOfEarings = deals?.length > 0 ? begginOfTheDay(Math.min(...deals?.map(({date}) => date.purchasedAt))) : Date.now();
  const daysWithEarnings = Math.ceil(days_between(Date.now(), begginOfEarings));

  return Array.from(Array(daysWithEarnings < 6 ? 6 : daysWithEarnings).keys()).reverse().map(daysBefore => {
    const day = calcDate(daysBefore);
    const profitsAtDay = calcProfitsAtDay(deals, day) as number;
    return {
      label: new Date(day).toLocaleDateString("en-GB", dateOptions),
      value: profitsAtDay
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
  const cleanStepSize = stepSize < 1 && stepSize > 0 ? relevantDecimals(stepSize) : Math.round(stepSize);

  const dynamicOptions: ChartOptions = {
    scales:{
      y:{
        ticks:{
          stepSize: cleanStepSize,
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