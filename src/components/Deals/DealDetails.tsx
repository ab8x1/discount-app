'use client'
import { DetailsGrid, DetailsContainer, DetailsHeader, Token, TokenImg, DiscountValue, DeatilsContent, Input, InputLayout, InputLabel, InfoRow, InputContainer, InputToken } from "./DealDetailsStyles"
import Image from "next/image"
import { useConnectWallet } from "@web3-onboard/react";
import DealDetailsProgress from "./DealDetailsProgress";

export default function DealDetails(){
    const [{ wallet }, connect] = useConnectWallet();
    return(
        <DetailsGrid>
            <DetailsContainer>
                <DetailsHeader>
                    <Token className="alignY">
                        <TokenImg src="/tokens/USDC.svg" width={53} height={53} alt="coin"/>
                        USDC
                    </Token>
                    <DiscountValue>
                        ~3%
                    </DiscountValue>
                </DetailsHeader>
                <DeatilsContent>
                    <InputContainer>
                        <InputLabel>How much do you want to spend?</InputLabel>
                        <InputLayout>
                            <Input type="number" step={0.1}/>
                            <InputToken>
                                <Image src="/tokens/USDC.svg" width={24} height={24} alt="token"/>
                                USDC
                            </InputToken>
                        </InputLayout>
                    </InputContainer>
                    <InfoRow>
                        <span>You’ll Receive</span>
                        <span style={{color: '#627EEA', fontWeight: 600}}>1030 Discounted USDC</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Return Date</span>
                        <span>14 Jun 2024</span>
                    </InfoRow>
                    <InfoRow>
                        <span>ROI / Discount</span>
                        <span className="brand">3.09%</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Fixed Profit</span>
                        <span className="brand">30 USDC</span>
                    </InfoRow>
                </DeatilsContent>
                <button className="boxButton alignY" onClick={() => connect()}>
                    Get this deal
                    <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>
                </button>
            </DetailsContainer>
            <DealDetailsProgress/>
        </DetailsGrid>
    )
}
