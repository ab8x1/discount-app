'use client'
import { DetailsContainer, DetailsHeader, Token, TokenImg, DiscountValue, DeatilsContent, InfoRow, } from "./DetailsStyles"
import Image from "next/image"
import { useConnectWallet } from "@web3-onboard/react";
import { Dispatch, SetStateAction } from "react";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from "@/helpers/fixedNumber";
import TokenInput from "@/modules/TokenInput"
import { DealDetailsType } from "./DetailsTypes"

export default function DealDetails({
    setAmount,
    dealDetails
} : {
    setAmount: Dispatch<SetStateAction<number>>,
    dealDetails: DealDetailsType
}){
    const {date, discount, earn, reedem, roi} = dealDetails;
    const [{ wallet }, connect] = useConnectWallet();
    return(
        <DetailsContainer>
            <DetailsHeader>
                <Token className="alignY">
                    <TokenImg src="/tokens/USDC.svg" width={53} height={53} alt="coin"/>
                    USDC
                </Token>
                <DiscountValue>
                    ~{discount}%
                </DiscountValue>
            </DetailsHeader>
            <DeatilsContent>
                <TokenInput
                    onChange={setAmount}
                />
                <InfoRow>
                    <span>You’ll Receive</span>
                    <span style={{color: '#627EEA', fontWeight: 600}}>{fixedNumber(reedem)} Discounted USDC</span>
                </InfoRow>
                <InfoRow>
                    <span>Return Date</span>
                    <span>{timestampToDate(date.end)}</span>
                </InfoRow>
                <InfoRow>
                    <span>ROI / Discount</span>
                    <span className="brand">{roi}%</span>
                </InfoRow>
                <InfoRow>
                    <span>Fixed Profit</span>
                    <span className="brand">{fixedNumber(earn)} USDC</span>
                </InfoRow>
            </DeatilsContent>
            <button className="boxButton alignY" onClick={() => connect()}>
                Get this deal
                <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>
            </button>
        </DetailsContainer>
    )
}
