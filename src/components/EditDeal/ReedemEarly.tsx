import { DetailsContainer, InfoContent, InfoRow, PopUpBackground, PopUpContainer } from "../DealDetails/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useState, useRef } from "react";
import OnClickOutside from "@/hooks/useClickOutside";
import ActionConfirmation from "../DealDetails/ActionConfirmation";
import { PurchasedDeal } from "@/types/deal";
import fixedNumber from "@/helpers/fixedNumber";
import { currentValue, RefreshValue } from "@/helpers/calculateProfits";

export default function ReedemEarly({
    deal
} : {
    deal: PurchasedDeal
}){
    const [stage, setStage] = useState<null | "confirmation" | "receipt">(null);
    const ref: any = useRef();
    OnClickOutside(ref, () => setStage(null));
    const calcActualVal = () => deal.purchasePrice + currentValue(deal.amount - deal.purchasePrice, deal.date.purchasedAt, deal.date.maturity);

    return(
        <>
            <DetailsContainer>
                <InfoContent>
                    <h3>Redeem Early</h3>
                    <InfoRow>
                        <span>Estimated Value</span>
                        <span>
                            <RefreshValue
                                updateFunction={calcActualVal}
                                roundTo={8}
                            />
                            <span style={{marginLeft: '5px'}}>
                                {deal.token}
                            </span>
                        </span>
                    </InfoRow>
                    <DefaultButton $bg="#FFB673" $bgHover="#f7bf8a" $fullWidth style={{padding: '15px 0'}} onClick={() => setStage("confirmation")}>
                        Redeem Early
                    </DefaultButton>
                </InfoContent>
            </DetailsContainer>
            {
                stage === "confirmation" ?
                <PopUpBackground>
                    <PopUpContainer ref={ref} style={{fontSize: '0.9rem'}}>
                        <h3>Redeem Early</h3>
                        <InfoRow>
                            <span>Platform Fee (0.1%)</span>
                            <span>{fixedNumber(0.001 * deal.purchasePrice)} {deal.token}</span>
                        </InfoRow>
                        <InfoRow>
                            <span>Minimum Received</span>
                            <span className="brand">
                                <RefreshValue
                                    updateFunction={calcActualVal}
                                    roundTo={8}
                                />
                                <span style={{marginLeft: '5px'}}>{deal.token}</span>
                            </span>
                        </InfoRow>
                        <DefaultButton $bg="#FFB673" $bgHover="#f7bf8a" $fullWidth style={{marginTop: '10px'}} onClick={() => setStage("receipt")}>
                        Redeem Early
                    </DefaultButton>
                    </PopUpContainer>
                </PopUpBackground>
                : stage === "receipt" ?
                <ActionConfirmation
                    type="reedemEarly"
                    reedem={1000}
                    amount={950}
                />
                : null
            }
        </>
    )
}
