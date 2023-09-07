'use client'
import { DetailsContainer, DetailsHeader, Token, TokenContainer, TokenImg, DiscountValue, DeatilsContent, InfoRow, StageButton, PopUpBackground, PopUpContainer, Profit } from "./DetailsStyles"
import Image from "next/image"
import { useConnectWallet } from "@web3-onboard/react";
import { useState, Dispatch, SetStateAction } from "react";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from "@/helpers/fixedNumber";
import TokenInput from "@/modules/TokenInput"
import { DealDetailsType, Stage } from "./DetailsTypes"
import ActionConfirmation from "./ActionConfirmation";
import buyDeal from "./helpers/buyDeal";
import { DefaultButton } from "../Navbar/NavbarStyles";
import BackButton from "../Navbar/BackButton";

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
    const {date, discount, earn, reedem, roi, token} = dealDetails;
    const fee = fixedNumber(amount * 0.001, false, 2, true) as number;
    const [{ wallet }, connect] = useConnectWallet();
    const {address} = wallet?.accounts[0] ?? {};
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const confirmStage = stage === 'confirm';
    const action = () => {
        if(confirmStage){
            buyDeal(dealDetails, amount, address);
            setOpenConfirmation(true);
        }
        else {
            setStage("confirm");
        }
    }
    return(
        <div>
            <BackButton/>
            <DetailsContainer>
                <DetailsHeader>
                    <Token className="alignY">
                        <TokenContainer>
                            <TokenImg src="/tokens/USDC.svg" width={56} height={56} alt="coin"/>
                            <span>
                                <Image src="/discounted.svg" width={18} height={18} alt="discounted"/>
                            </span>
                        </TokenContainer>
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
                        <span>{fixedNumber(reedem)} USDC</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Market Price</span>
                        <span style={{color: '#F47272'}}>{fixedNumber(reedem)} $</span>
                    </InfoRow>
                    <InfoRow>
                        <span className="alignY">
                            Discount
                            <Image src="/discounted-square.svg" width={20} height={20} alt="discounted" style={{margin: '0 3px'}}/>
                            Price
                        </span>
                        <span className="brand">
                            {amount} $
                        </span>
                    </InfoRow>
                    <Profit>
                        <Image src="/thumbs-up.svg" width={20} height={20} alt="thumbs-up"/>
                        You’re saving ${fixedNumber(earn)} on this deal
                    </Profit>
                    {
                        confirmStage &&
                        <>
                            <InfoRow style={{borderTop: '2px solid #00D26B'}}>
                                <span>Discounted Price</span>
                                <span>{amount} USDC (<span style={{color: "#627EEA"}}>{discount}%</span>)</span>
                            </InfoRow>
                            <InfoRow>
                                <span>Platform Fee (0.1%)</span>
                                <span>{fee} USDC</span>
                            </InfoRow>
                        </>
                    }
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        {   confirmStage &&
                            <StageButton onClick={() => setStage("buy")}>
                                <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>
                            </StageButton>
                        }
                        <DefaultButton $disabled={!amount} $fullWidth onClick={action} style={{padding: '18px'}}>
                            {confirmStage ? `Pay ${amount + fee} ${token}` : "Continue"}
                            {!confirmStage && <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>}
                        </DefaultButton>
                    </div>
                </DeatilsContent>
            </DetailsContainer>
            {
                openConfirmation &&
                <ActionConfirmation
                    type="buy"
                    amount={amount + fee}
                    reedem={reedem}
                />
            }
        </div>
    )
}
