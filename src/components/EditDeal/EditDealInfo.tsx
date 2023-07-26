'use client'
import { DetailsContainer, DetailsHeader, Token, TokenImg, InfoRow, DeatilsContent } from "../DealDetails/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useConnectWallet } from "@web3-onboard/react";

export default function EditDealInfo(){
    const [{ wallet }, connect] = useConnectWallet();
    return(
            <DetailsContainer>
                <DetailsHeader>
                    <Token className="alignY">
                        <TokenImg src="/tokens/USDC.svg" width={53} height={53} alt="coin"/>
                        USDC
                    </Token>
                </DetailsHeader>
                <DeatilsContent>
                    <InfoRow>
                        <span>Fixed Return</span>
                        <span style={{color: '#627EEA', fontWeight: 600}}>1030 USDC</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Discounted Price</span>
                        <span>1000 USDC <span style={{color: '#627EEA', fontWeight: 600}}>(3.01%)</span></span>
                    </InfoRow>
                    <InfoRow>
                        <span>Return Date</span>
                        <span>14 Jun 2025</span>
                    </InfoRow>
                    <InfoRow>
                        <span>ROI</span>
                        <span className="brand">3%</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Fixed Profit</span>
                        <span className="brand">30 USDC</span>
                    </InfoRow>
                </DeatilsContent>
                <button className={`boxButton alignY disabledButton`} onClick={() => connect()} style={{padding: '30px 0'}}>
                    Redeem 1030 USDC
                </button>
            </DetailsContainer>
    )
}
