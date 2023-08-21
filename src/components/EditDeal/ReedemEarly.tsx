import { DetailsContainer, InfoContent, InfoRow, PopUpBackground, PopUpContainer } from "../DealDetails/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useState, useRef } from "react";
import OnClickOutside from "@/hooks/useClickOutside";
import ActionConfirmation from "../DealDetails/ActionConfirmation";
import { PurchasedDeal } from "@/types/deal";
import fixedNumber from "@/helpers/fixedNumber";
import { actualProfitValue, reedemValue, RefreshValue } from "@/helpers/calculateProfits";
import { mergeDeep } from '@/components/Earnings/Chart/chartHelpers';

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
        const reedemVal = {
            reedem: fixedNumber(reedemValue(deal), false, 5, true) as number,
            amount: deal.purchasePrice + fee
        }
        const closedDeal = mergeDeep(deal, {date: {
            redeemedAt: Date.now()
        }});
        const allDeals = JSON.parse(window.localStorage.getItem(`purchasedDeals`) || '{}');
        const userDeals: PurchasedDeal[] | undefined = allDeals?.[address || ''];
        const updatedUserDeals = userDeals?.map(deal => deal.id === closedDeal.id ? closedDeal : deal) || {};
        const updatedAllDeals = {
            ...allDeals,
            [address]: updatedUserDeals
        }
        window.localStorage.setItem('purchasedDeals', JSON.stringify(updatedAllDeals));
        setStage(reedemVal);
    }
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
                            <span>{fee} {deal.token}</span>
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
