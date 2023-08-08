'use client'
import { DetailsContainer, DetailsHeader, Token, TokenImg, DiscountValue, DeatilsContent, InfoRow, StageButton, PopUpBackground, PopUpContainer } from "./DetailsStyles"
import Image from "next/image"
import { useConnectWallet } from "@web3-onboard/react";
import { useState, Dispatch, SetStateAction } from "react";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from "@/helpers/fixedNumber";
import TokenInput from "@/modules/TokenInput"
import { DealDetailsType, Stage } from "./DetailsTypes"
import { DefaultButtonLink } from "../Navbar/NavbarStyles";
import Confetti from 'react-confetti';
import ActionConfirmation from "./ActionConfirmation";

export default function DealDetails({
    setAmount,
    dealDetails,
    stage,
    amount,
    setStage
} : {
    setAmount: Dispatch<SetStateAction<number>>,
    dealDetails: DealDetailsType,
    stage: Stage,
    amount: number,
    setStage: Dispatch<SetStateAction<Stage>>,
}){
    const {date, discount, earn, reedem, roi} = dealDetails;
    const [{ wallet }, connect] = useConnectWallet();
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const confirmStage = stage === 'confirm';
    const action = () => {
        if(confirmStage)
            setOpenConfirmation(true);
        else
            setStage("confirm");
    }
    return(
        <>
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
                    {
                        !confirmStage &&
                        <TokenInput
                            defaultValue={amount}
                            onChange={setAmount}
                        />
                    }
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
                    {
                        confirmStage &&
                        <>
                            <InfoRow style={{borderTop: '2px solid #00D26B'}}>
                                <span>Discounted Price</span>
                                <span>{amount} USDC (<span style={{color: "#627EEA"}}>{discount}%</span>)</span>
                            </InfoRow>
                            <InfoRow>
                                <span>Platform Fee (0.1%)</span>
                                <span>{fixedNumber(earn * 0.001, false, 2)} USDC</span>
                            </InfoRow>
                        </>
                    }
                </DeatilsContent>
                <div style={{display: 'flex'}}>
                    {   confirmStage &&
                        <StageButton onClick={() => setStage("buy")}>
                            <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>
                        </StageButton>
                    }
                    <button className={`boxButton alignY ${!amount ? 'disabledButton' : ''}`} style={confirmStage ? {borderRadius: '0 0 9px 0'} : undefined} onClick={wallet ? action : () => connect()}>
                        {confirmStage ? " Finalize Purchase" : "Get this deal"}
                        {!confirmStage && <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>}
                    </button>
                </div>
            </DetailsContainer>
            {
                openConfirmation &&
                <ActionConfirmation
                    type="buy"
                    amount={amount}
                    reedem={reedem}
                />
            }
        </>
    )
}
