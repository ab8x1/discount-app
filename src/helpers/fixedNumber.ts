export default function(num: number | string, showAll = false, decimals = 5, returnAsNum = false): string | number {
    try{
        const fixed = showAll ? Number(num).toFixed(decimals) : Number(Number(num).toFixed(decimals)).toString();
        return returnAsNum ? Number(fixed) : fixed;
    }
    catch(e){
        console.log(e);
        return "0";
    }
}

export function showNumOfDecimals(number: number | string, numOfDecimals: number){
    return Math.floor((Number(number) * (10 ** numOfDecimals))) / (10 ** numOfDecimals)
}