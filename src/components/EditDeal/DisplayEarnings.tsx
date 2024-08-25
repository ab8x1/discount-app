import { days_between, RefreshValue, actualProfitValue, reedemValue } from "@/helpers/calculateProfits";
import fixedNumber from "@/helpers/fixedNumber";
import { OfferContainer, InfoContent, InfoRow } from "../Offer/DetailsStyles";
import { DealType } from "@/types/deal";


export default function DisplayEarnings({
    deal,
    timestamp,
    estimatedReedem
} : {
    deal: DealType,
    timestamp?: number,
    estimatedReedem: number
}){
    const totalProfits = Number(fixedNumber(estimatedReedem - deal.purchasePrice, true, 2));

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
                        <span className={totalProfits > 0 ? "brand" : ""}>
                            <span style={{marginRight: '3px'}}>
                                {totalProfits}
                            </span>
                            USDC
                        </span>
                    </div>
                </InfoRow>
            </InfoContent>
        </OfferContainer>
    )
}