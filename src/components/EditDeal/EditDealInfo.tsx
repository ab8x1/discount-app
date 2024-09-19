import { DealType } from "@/types/deal";
import { useState, useEffect } from "react";
import { OfferContainer, OfferHeader, Token, TokenImg, InfoRow, OfferContent } from "../Offer/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from "@/helpers/fixedNumber";
import { UserType } from "@/hooks/useUser";
import { OfferType } from "@/types/offer";
import reedemOrClaimEarly from "@/helpers/reedemOrClaimEarly";
import { toast } from "react-toastify";
import ReedemConfirmation from "./ReedemConfirmation";

export default function EditDealInfo({
    deal,
    user,
    estimatedReedem,
    offerData
} : {
    deal: DealType,
    user: UserType,
    estimatedReedem: number,
    offerData: OfferType
}){
    const {amount, token, purchasePrice, date} = deal;
    const [loading, setLoading] = useState(false);
    const [dealDate, setDealDate] = useState<DealType["date"]>();
    const [reedemedValue, setRedeemValue] = useState<null | number>(null);

    useEffect(() => {
        setDealDate(date);
    }, [])

    const reedem = async () => {
        if(user && estimatedReedem){
            setLoading(true);
            const reedem = await reedemOrClaimEarly("reedem", user, offerData, deal, estimatedReedem);
            if(reedem !== null){
                const {value, message} = reedem;
                if(message) toast(message, { type: "warning", autoClose: false});
                setRedeemValue(value)
            }
            else {
                toast("Sorry, something went wrong, try again soon.", { type: "error" });
            }
            setLoading(false);
        }
    }

    return(
            <OfferContainer>
                <OfferHeader>
                    <Token className="alignY">
                        <TokenImg src={`/tokens/${token}.svg`} width={53} height={53} alt="coin"/>
                        {token} | <span style={{fontWeight: 'normal'}}>Purchase Summary</span>
                    </Token>
                </OfferHeader>
                <OfferContent>
                    <InfoRow>
                        <span>Purchase Date</span>
                        <span>{dealDate && timestampToDate(dealDate.purchasedAt)}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>You Paid</span>
                        <span>{purchasePrice} {token}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>You’ll Receive</span>
                        <span>{fixedNumber(amount, false, 4)} {token}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Claim Date</span>
                        <span>{dealDate && timestampToDate(dealDate.maturity)}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Discount</span>
                        <span className="brand">{fixedNumber(amount - purchasePrice, false, 2)} $</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Fixed Profit</span>
                        <span className="brand">{fixedNumber(amount - purchasePrice, false, 2)} {token}</span>
                    </InfoRow>
                    <DefaultButton $fullWidth $disabled={Date.now() < date.maturity || loading} style={{padding: '18px', marginTop: '25px'}} onClick={reedem}>
                        Claim {fixedNumber(amount, false, 4)} {token}
                    </DefaultButton>
                </OfferContent>
                {
                    reedemedValue &&
                    <ReedemConfirmation
                        reedem={reedemedValue}
                        token={deal.token}
                    />
                }
            </OfferContainer>
    )
}
