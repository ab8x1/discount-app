import { days_between, RefreshValue, actualProfitValue, reedemValue } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";
import { DealContainer, InfoContent, InfoRow } from "../DealDetails/DetailsStyles";
import { PurchasedDeal } from "@/types/deal";


export default function DisplayEarnings({
    deal,
    timestamp
} : {
    deal: PurchasedDeal,
    timestamp?: number
}){
    const updateFunction = () => actualProfitValue(deal);
    const reedem = reedemValue(deal);

    return(
        <DealContainer style={{marginBottom: '20px'}}>
            <InfoContent>
                <h3 style={{marginBottom: '20px'}}>Earnings</h3>
                <InfoRow>
                    <span>{timestamp && 'Prev'} Avg. 24hr Profits:</span>
                    <span className="brand">{fixedNumber((deal.amount - deal.purchasePrice) / days_between(deal.date.purchasedAt, deal.date.maturity))} {deal.token}</span>
                </InfoRow>
                <InfoRow>
                    <span>Total Profits {!timestamp && 'So Far'}:</span>
                    <span className="brand">
                        <span style={{marginRight: '5px'}}>
                            {
                                timestamp ? fixedNumber(reedem - deal.purchasePrice)
                                :
                                <RefreshValue
                                    updateFunction={updateFunction}
                                    roundTo={8}
                                />
                            }
                        </span>
                        USDC
                    </span>
                </InfoRow>
            </InfoContent>
        </DealContainer>
    )
}