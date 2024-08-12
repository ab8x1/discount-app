import { OfferContainer, InfoContent, InfoRow, PopUpBackground, PopUpContainer } from "../Offer/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useState, useRef } from "react";
import OnClickOutside from "@/hooks/useClickOutside";
import { DealType } from "@/types/deal";
import fixedNumber from "@/helpers/fixedNumber";
import { reedemValue, RefreshValue } from "@/helpers/calculateProfits";
import { reedemEarly } from "./helpers/editDealHelpers";
import ReedemConfirmation from './ReedemConfirmation';
import useUser from "@/hooks/useUser";

export default function ReedemEarly({
    deal,
} : {
    deal: DealType,
}){
    const user = useUser();
    const [stage, setStage] = useState<null | "confirmation" | {
        reedem: number,
        amount: number
    }>(null);
    const ref: any = useRef();
    OnClickOutside(ref, () => setStage(null));
    const calcActualVal = () => reedemValue(deal);
    const fee = fixedNumber(0.001 * deal.purchasePrice, false, 2, true) as number;
    const reedem = () => {
        const reedemVal = reedemEarly(deal, fee, user?.address);
        setStage(reedemVal);
    }
    return(
        <>
            <OfferContainer>
                <InfoContent>
                    <h3>Claim Early</h3>
                    <InfoRow style={{margin: '15px 0'}}>
                        <span>Estimated Value</span>
                        <span style={{color: '#7F56D9'}}>
                            <RefreshValue
                                updateFunction={calcActualVal}
                                roundTo={8}
                            />
                            <span style={{marginLeft: '5px'}}>
                                {deal.token}
                            </span>
                        </span>
                    </InfoRow>
                    <DefaultButton $bg="#7F56D9" $bgHover="#8965d8" $fullWidth style={{padding: '18px 0'}} onClick={() => setStage("confirmation")}>
                        Claim Early
                    </DefaultButton>
                </InfoContent>
            </OfferContainer>
            {
                stage === "confirmation" ?
                <PopUpBackground>
                    <PopUpContainer ref={ref} style={{fontSize: '0.9rem'}}>
                        <h3 style={{fontSize: '1.12rem'}}>Claim Early</h3>
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
                            <div>
                                <span className="brand">
                                    <RefreshValue
                                        updateFunction={() => calcActualVal() - fee}
                                        roundTo={8}
                                    />
                                    <span style={{marginLeft: '5px'}}>{deal.token}</span>
                                </span>
                            </div>
                        </InfoRow>
                        <DefaultButton $bg="#7F56D9" $bgHover="#8965d8" $fullWidth style={{marginTop: '20px'}} onClick={reedem}>
                        Redeem Early
                    </DefaultButton>
                    </PopUpContainer>
                </PopUpBackground>
                : stage ?
                <ReedemConfirmation
                    type="reedemEarly"
                    {...stage}
                    token={deal.token}
                />
                : null
            }
        </>
    )
}
