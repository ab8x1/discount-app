import { DealType } from "@/types/deal";
import { useState, useEffect } from "react";
import { OfferContainer, OfferHeader, Token, TokenImg, InfoRow, OfferContent } from "../Offer/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from "@/helpers/fixedNumber";

export default function EditDealInfo({
    deal
} : {
    deal: DealType
}){
    const {amount, token, purchasePrice, date, owner} = deal;
    const [dealDate, setDealDate] = useState<DealType["date"]>();
    useEffect(() => {
        setDealDate(date);
    }, [])
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
                    <DefaultButton $fullWidth $disabled={Date.now() < date.maturity} style={{padding: '18px', marginTop: '25px'}}>
                        Claim {fixedNumber(amount, false, 4)} {token}
                    </DefaultButton>
                </OfferContent>
            </OfferContainer>
    )
}
