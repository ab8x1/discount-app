'use client'
import { DealContainer, DealHeader, Token, TokenContainer, TokenImg, DiscountValue, DealContent, InfoRow, StageButton, Profit } from "./DetailsStyles"
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
import useUser from "@/hooks/useUser";

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
    const user = useUser();
    const {date, discount, earn, reedem, roi, token} = dealDetails;
    const fee = fixedNumber(amount * 0.001, false, 2, true) as number;
    const [{ wallet }, connect] = useConnectWallet();
    const {address} = wallet?.accounts[0] ?? {};
    const [confirmationID, setConfirmationID] = useState<string | null>(null);
    const confirmStage = stage === 'confirm';
    const action = async () => {
        if(confirmStage){
            if(user){
                const newOfferId = await buyDeal(amount, user);
                setConfirmationID(newOfferId);
            }
            else{
                connect();
            }
        }
        else if(amount) {
            setStage("confirm");
        }
    }
    return(
        <>
            <DealContainer>
                <DealHeader>
                    <Token className="alignY">
                        <TokenContainer>
                            <TokenImg src={`/tokens/${token}.svg`} width={56} height={56} alt="coin"/>
                            <span>
                                <Image src="/discounted.svg" width={18} height={18} alt="discounted"/>
                            </span>
                        </TokenContainer>
                        {token}
                    </Token>
                    <DiscountValue>
                        ~{discount}%
                    </DiscountValue>
                </DealHeader>
                <DealContent>
                    {
                        !confirmStage &&
                        <TokenInput
                            defaultValue={amount}
                            onChange={setAmount}
                            action={action}
                            token={token}
                        />
                    }
                    {
                        confirmStage &&
                        <InfoRow>
                            <span>You Pay</span>
                            <span>{amount} {token}</span>
                        </InfoRow>
                    }
                    <InfoRow>
                        <span>You’ll Receive</span>
                        <span>{fixedNumber(reedem)} {token}</span>
                    </InfoRow>
                    {
                        confirmStage ?
                        <>
                            <InfoRow>
                                <span>Claim Date</span>
                                <span>{timestampToDate(date.end)}</span>
                            </InfoRow>
                            <InfoRow>
                                <span>Discount</span>
                                <span className="brand">{earn} $</span>
                            </InfoRow>
                            <InfoRow>
                                <span>Fixed Profit</span>
                                <span className="brand">{earn} {token}</span>
                            </InfoRow>
                        </>
                        :
                        <>
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
                        </>
                    }
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        {   confirmStage &&
                            <StageButton onClick={() => setStage("buy")}>
                                <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>
                            </StageButton>
                        }
                        <DefaultButton $disabled={!amount} $fullWidth onClick={action} style={{padding: '18px'}}>
                            {confirmStage
                                ? wallet 
                                ? `Pay ${amount} ${token}`
                                : "Connect Wallet" 
                                : "Continue"
                            }
                            {!confirmStage && <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>}
                        </DefaultButton>
                    </div>
                </DealContent>
            </DealContainer>
            {
                confirmationID &&
                <ActionConfirmation
                    type="buy"
                    amount={amount}
                    reedem={reedem}
                    maturity={date.end}
                    token={token}
                    offerId={confirmationID}
                />
            }
        </>
    )
}
