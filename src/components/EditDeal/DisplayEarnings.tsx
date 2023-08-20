import { days_between, RefreshValue, currentValue, valueAtTime } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";
import { DetailsContainer, InfoContent, InfoRow } from "../DealDetails/DetailsStyles";
import { PurchasedDeal } from "@/types/deal";


export default function DisplayEarnings({
    deal,
    timestamp
} : {
    deal: PurchasedDeal,
    timestamp?: number
}){
    const updateFunction = () => currentValue(deal.amount - deal.purchasePrice, deal.date.purchasedAt, deal.date.maturity);
    const reedemValue = deal.purchasePrice + valueAtTime(deal.amount - deal.purchasePrice, deal.date.purchasedAt, deal.date.maturity, timestamp || 0);
    return(
        <DetailsContainer style={{marginTop: '15px'}}>
            <InfoContent>
                <h3>Earnings</h3>
                <InfoRow>
                    <span>Avg. 24hr Profits:</span>
                    <span className="brand">{fixedNumber((deal.amount - deal.purchasePrice) / days_between(deal.date.purchasedAt, deal.date.maturity))} {deal.token}</span>
                </InfoRow>
                <InfoRow>
                    <span>Total Profits {!timestamp && 'So Far'}:</span>
                    <span className="brand">
                        <span style={{marginRight: '5px'}}>
                            {
                                timestamp ? fixedNumber(reedemValue)
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
        </DetailsContainer>
    )
}