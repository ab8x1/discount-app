'use client'
import { PurchasedDeal } from "@/types/deal";
import { DetailsContainer, DetailsHeader, Token, TokenImg, InfoRow, DeatilsContent } from "../DealDetails/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useConnectWallet } from "@web3-onboard/react";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from "@/helpers/fixedNumber";

export default function EditDealInfo({
    deal
} : {
    deal: PurchasedDeal
}){
    const [{ wallet }, connect] = useConnectWallet();
    const {amount, date, discount, token, purchasePrice} = deal;
    return(
            <DetailsContainer>
                <DetailsHeader>
                    <Token className="alignY">
                        <TokenImg src={`/tokens/${token}.svg`} width={53} height={53} alt="coin"/>
                        {token}
                    </Token>
                </DetailsHeader>
                <DeatilsContent>
                    <InfoRow>
                        <span>Fixed Return</span>
                        <span style={{color: '#627EEA', fontWeight: 600}}>{amount} {token}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Discounted Price</span>
                        <span>{purchasePrice} {token} <span style={{color: '#627EEA', fontWeight: 600}}>({discount}%)</span></span>
                    </InfoRow>
                    <InfoRow>
                        <span>Return Date</span>
                        <span>{timestampToDate(date.maturity)}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>ROI</span>
                        <span className="brand">{discount}%</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Fixed Profit</span>
                        <span className="brand">{fixedNumber(amount - purchasePrice)} {token}</span>
                    </InfoRow>
                </DeatilsContent>
                <button className={`boxButton alignY disabledButton`} onClick={() => connect()} style={{padding: '30px 0'}}>
                    Claim {amount} {token}
                </button>
            </DetailsContainer>
    )
}
