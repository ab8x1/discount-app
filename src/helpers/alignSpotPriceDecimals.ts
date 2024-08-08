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