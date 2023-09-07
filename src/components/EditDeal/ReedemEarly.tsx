import { DealContainer, InfoContent, InfoRow, PopUpBackground, PopUpContainer } from "../DealDetails/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useState, useRef } from "react";
import OnClickOutside from "@/hooks/useClickOutside";
import ActionConfirmation from "../DealDetails/ActionConfirmation";
import { PurchasedDeal } from "@/types/deal";
import fixedNumber from "@/helpers/fixedNumber";
import { actualProfitValue, reedemValue, RefreshValue } from "@/helpers/calculateProfits";
import { mergeDeep } from '@/components/Earnings/Chart/chartHelpers';
import { reedemEarly } from "./helpers/editDealHelpers";

export default function ReedemEarly({
    deal,
    address
} : {
    deal: PurchasedDeal,
    address: string
}){
    const [stage, setStage] = useState<null | "confirmation" | {
        reedem: number,
        amount: number
    }>(null);
    const ref: any = useRef();
    OnClickOutside(ref, () => setStage(null));
    const calcActualVal = () => reedemValue(deal);
    const fee = fixedNumber(0.001 * deal.purchasePrice, false, 2, true) as number;
    const reedem = () => {
        const reedemVal = reedemEarly(deal, fee, address);
        setStage(reedemVal);
    }
    return(
        <>
            <DealContainer>
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
            </DealContainer>
            {
                stage === "confirmation" ?
                <PopUpBackground>
                    <PopUpContainer ref={ref} style={{fontSize: '0.9rem'}}>
                        <h3>Redeem Early</h3>
                        <InfoRow>
                            <span>Estimated Value</span>
                            <span>
                                <RefreshValue
                                    updateFunction={calcActualVal}
                                    roundTo={8}
                                />
                               <span style={{marginLeft: '5px'}}>{deal.token}</span>
                            </span>
                        </InfoRow>
                        <InfoRow>
                            <span>Platform Fee (0.1%)</span>
                            <span>{fee} {deal.token}</span>
                        </InfoRow>
                        <InfoRow>
                            <span>Minimum Received</span>
                            <span className="brand">
                                <RefreshValue
                                    updateFunction={() => calcActualVal() - fee}
                                    roundTo={8}
                                />
                                <span style={{marginLeft: '5px'}}>{deal.token}</span>
                            </span>
                        </InfoRow>
                        <DefaultButton $bg="#FFB673" $bgHover="#f7bf8a" $fullWidth style={{marginTop: '10px'}} onClick={reedem}>
                        Redeem Early
                    </DefaultButton>
                    </PopUpContainer>
                </PopUpBackground>
                : stage ?
                <ActionConfirmation
                    type="reedemEarly"
                    {...stage}
                />
                : null
            }
        </>
    )
}
