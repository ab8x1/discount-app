export const alignSpotPriceDecimals = (
    spotPrice: bigint,
    fromDecimals: number,
    toDecimals: number
): bigint => {
    const decimalDelta = fromDecimals - toDecimals;
    if (decimalDelta === 0) {
        return spotPrice;
    } else if (decimalDelta > 0) {
        return spotPrice / BigInt(10) ** BigInt(decimalDelta);
    } else {
        return spotPrice * BigInt(10) ** BigInt(-decimalDelta);
    }
};

export const getDecimalPlaces = (number: number) => {
    const [integer, decimal] = number.toString().split(".");
    if(number >= 1){
        return integer.length - 1;
    }
    else{
        const match = decimal.match(/(0*)([1-9].*)/);
        const decimals = match?.[1];
        if(!decimals) return -1
        else return -(decimals.length + 1)
    }
}