import { DetailsContainer, InfoContent, InfoRow, PopUpBackground, PopUpContainer } from "../DealDetails/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useState, useRef } from "react";
import OnClickOutside from "@/hooks/useClickOutside";
import ActionConfirmation from "../DealDetails/ActionConfirmation";

export default function ReedemEarly(){
    const [stage, setStage] = useState<null | "confirmation" | "receipt">(null);
    const ref: any = useRef();
    OnClickOutside(ref, () => setStage(null));

    return(
        <>
            <DetailsContainer>
                <InfoContent>
                    <h3>Redeem Early</h3>
                    <InfoRow>
                        <span>Estimated Value</span>
                        <span>1000.000014 USDC</span>
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
                            <span>Platform Fee (0.05%)</span>
                            <span>0.460000007 USDC</span>
                        </InfoRow>
                        <InfoRow>
                            <span>Minimum Received</span>
                            <span className="brand">950.012391 USDC</span>
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
