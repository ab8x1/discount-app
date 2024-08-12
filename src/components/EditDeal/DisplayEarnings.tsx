import { days_between, RefreshValue, actualProfitValue, reedemValue } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";
import { OfferContainer, InfoContent, InfoRow } from "../Offer/DetailsStyles";
import { DealType } from "@/types/deal";


export default function DisplayEarnings({
    deal,
    timestamp
} : {
    deal: DealType,
    timestamp?: number
}){
    const updateFunction = () => actualProfitValue(deal);
    const reedem = reedemValue(deal);
    const fee = fixedNumber(0.001 * deal.purchasePrice, false, 2, true) as number;

    return(
        <OfferContainer style={{marginBottom: '20px', marginTop: timestamp ? '30px' : 0}}>
            <InfoContent>
                <h3 style={{marginBottom: '20px'}}>Earnings</h3>
                <InfoRow>
                    <span>{timestamp && 'Prev'} Avg. 24hr Profits:</span>
                    <span className="brand">{fixedNumber((deal.amount - deal.purchasePrice) / days_between(deal.date.purchasedAt, deal.date.maturity))} {deal.token}</span>
                </InfoRow>
                <InfoRow>
                    <span>Total Profits {!timestamp && 'So Far'}:</span>
                    <div>
                        <span className="brand">
                            <span style={{marginRight: '3px'}}>
                                {
                                    timestamp ? fixedNumber(reedem - deal.purchasePrice - fee)
                                    :
                                    <RefreshValue
                                        updateFunction={updateFunction}
                                        roundTo={8}
                                    />
                                }
                            </span>
                            USDC
                        </span>
                    </div>
                </InfoRow>
            </InfoContent>
        </OfferContainer>
    )
}