'use client'
import { DealContainer, DealHeader, Token, TokenContainer, TokenImg, DiscountValue, DealContent, InfoRow, StageButton, Profit } from "./DetailsStyles"
import Image from "next/image"
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { useState, Dispatch, SetStateAction } from "react";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber from "@/helpers/fixedNumber";
import TokenInput from "@/modules/TokenInput"
import { DealDetailsType, Stage } from "./DetailsTypes"
import ActionConfirmation from "./ActionConfirmation";
import buyDeal from "./helpers/buyDeal";
import { DefaultButton } from "../Navbar/NavbarStyles";
import useUser from "@/hooks/useUser";
import LoadingValue from "../LoadingValue";

export default function DealDetails({
    setAmount,
    dealDetails,
    stage,
    amount,
    setStage
} : {
    setAmount: (amount: number) => void,
    dealDetails: DealDetailsType,
    stage: Stage,
    amount: number,
    setStage: Dispatch<SetStateAction<Stage>>,
}){
    const user = useUser();
    const [{ connectedChain, settingChain }, setChain] = useSetChain();
    const {date, discount, earn, reedem, token, chainHexId} = dealDetails;
    const fee = fixedNumber(amount * 0.001, false, 2, true) as number;
    const [{ wallet }, connect] = useConnectWallet();
    const [confirmationID, setConfirmationID] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const confirmStage = stage === 'confirm';
    const action = async () => {
        if(confirmStage){
            try{
                if(user){
                    if(connectedChain?.id === chainHexId){
                        setLoading(true);
                        const newOfferId = await buyDeal(amount, user, dealDetails);
                        setLoading(false);
                        setConfirmationID(newOfferId);
                    }
                    else{
                        setLoading(true);
                        await setChain({chainId: chainHexId});
                        setLoading(false)
                    }
                }
                else{
                    setLoading(true);
                    await connect();
                    setLoading(false);
                }
            }
            catch(e){
                setLoading(false);
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
                        <LoadingValue
                            isLoading={!discount}
                            value={
                                <>
                                    <span>•</span>
                                    {`~${fixedNumber(discount || 0, false, 0)}%`}
                                </>
                            }
                            loaderWidth={20}
                            loaderHeight={20}
                            loaderColor="green"
                        />
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
                        <div className="alignY gap-1">
                            <LoadingValue
                                isLoading={!reedem}
                                value={fixedNumber(reedem || 1)}
                                loaderWidth={18}
                                loaderHeight={18}
                                loaderColor="black"
                            />
                            {token}
                        </div>
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
                                <span className="brand">{fixedNumber(earn || 0, false, 2)} $</span>
                            </InfoRow>
                            <InfoRow>
                                <span>Fixed Profit</span>
                                <span className="brand">{fixedNumber(earn || 0, false, 2)} {token}</span>
                            </InfoRow>
                        </>
                        :
                        <>
                            <InfoRow>
                                <span>Market Price</span>
                                <div className="alignY gap-1" style={{color: '#F47272'}}>
                                    <LoadingValue
                                        isLoading={!reedem}
                                        value={fixedNumber(reedem || 1)}
                                        loaderWidth={18}
                                        loaderHeight={18}
                                        loaderColor="#F47272"
                                    />
                                    $
                                </div>
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
                                You’re saving $
                                <LoadingValue
                                    isLoading={!earn}
                                    value={fixedNumber(earn || 1, false, 2)}
                                    loaderWidth={15}
                                    loaderHeight={5}
                                    loaderColor="green"
                                />
                                on this deal
                            </Profit>
                        </>
                    }
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        {   confirmStage &&
                            <StageButton onClick={() => setStage("buy")}>
                                <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>
                            </StageButton>
                        }
                        <DefaultButton $disabled={!amount || loading} $fullWidth onClick={action} style={{padding: '18px'}}>
                            {confirmStage
                                ? wallet
                                ? connectedChain?.id === chainHexId
                                ? `Pay ${amount} ${token}`
                                : "Change Network to Sepolia"
                                : "Connect Wallet"
                                : "Continue"
                            }
                            <LoadingValue
                                isLoading={loading}
                                value=""
                                loaderColor="white"
                                loaderHeight={10}
                                loaderWidth={20}
                            />
                            {!confirmStage && <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>}
                        </DefaultButton>
                    </div>
                </DealContent>
            </DealContainer>
            {
                confirmationID && reedem &&
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
