'use client'
import { OfferContainer, OfferHeader, Token, TokenContainer, TokenImg, DiscountValue, OfferContent, InfoRow, StageButton, Profit } from "./DetailsStyles"
import Image from "next/image"
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import timestampToDate from "@/helpers/timestampToDate";
import fixedNumber, { showNumOfDecimals } from "@/helpers/fixedNumber";
import TokenInput from "@/modules/TokenInput"
import { DealDetailsType, Stage } from "./DetailsTypes"
import ActionConfirmation from "./ActionConfirmation";
import buyDeal from "./helpers/buyDeal";
import { DefaultButton } from "../Navbar/NavbarStyles";
import useUser from "@/hooks/useUser";
import LoadingValue from "../LoadingValue";
import erc20TokenBalance from "@/helpers/erc20TokenBalance";
import { OfferType } from "@/types/offer";

type ConfirmationData = {
    id: string,
    realReedem: number
}

export default function DealDetails({
    setAmount,
    dealDetails,
    stage,
    amount,
    setStage,
    offerData
} : {
    setAmount: (amount: number) => void,
    dealDetails: DealDetailsType,
    stage: Stage,
    amount: number,
    setStage: Dispatch<SetStateAction<Stage>>,
    offerData: OfferType
}){
    const user = useUser();
    const [{ connectedChain }, setChain] = useSetChain();
    const {date, discount, earn, reedem, token, chainHexId} = dealDetails;
    const [{ wallet }, connect] = useConnectWallet();
    const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
    const [loading, setLoading] = useState(false);
    const [userTokenBalance, setUserTokenBalance] = useState<number | null>(null);
    const confirmStage = stage === 'confirm';
    const disableButton = loading || confirmStage && !!wallet && connectedChain?.id === chainHexId && (!amount || !userTokenBalance || userTokenBalance < amount)

    useEffect(() => {
        const getUserBalance = async () => {
            if (user) {
                const balance = await erc20TokenBalance(user, offerData.underlyingTokenAddress);
                setUserTokenBalance(balance ? showNumOfDecimals(balance, 2) : null);
            }
            else{
                setUserTokenBalance(null)
            }
        }
        getUserBalance();
    }, [user])

    const action = async () => {
        if(confirmStage){
            if(user){
                if(connectedChain?.id === chainHexId){
                    setLoading(true);
                    const boughtDeal = await buyDeal(amount, user, dealDetails);
                    if(boughtDeal !== null){
                        const {newOfferId, realReedem, message} = boughtDeal;
                        if(message) window.alert(message);
                        setConfirmationData({
                            id: newOfferId,
                            realReedem
                        });
                    }
                    else{
                        window.alert("Sorry, something went wrong, try again soon.")
                    }
                    setLoading(false);
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
        else if(amount) {
            setStage("confirm");
        }
    }
    return(
        <>
            <OfferContainer>
                <OfferHeader>
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
                </OfferHeader>
                <OfferContent>
                    {
                        !confirmStage &&
                        <TokenInput
                            defaultValue={amount}
                            amount={amount}
                            onChange={setAmount}
                            action={action}
                            token={token}
                            userTokenBalance={userTokenBalance}
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
                            <InfoRow $borderTop>
                                <span>Platform Fee (incl.)</span>
                                <span>{fixedNumber(amount * 0.009, false, 2)} {token}</span>
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
                            <StageButton onClick={() => setStage("buy")} $disabled={loading}>
                                <Image src="/arrow-circle-right.svg" width={24} height={24} alt="coin"/>
                            </StageButton>
                        }
                        <DefaultButton $disabled={disableButton} $fullWidth onClick={action} style={{padding: '18px'}}>
                            {   confirmStage
                                ? wallet
                                ? connectedChain?.id === chainHexId
                                ? userTokenBalance !== null
                                ? amount <= userTokenBalance
                                ? `Pay ${amount} ${token}`
                                : "Insufficient balance"
                                : "Loading wallet balance"
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
                </OfferContent>
            </OfferContainer>
            {
                confirmationData && reedem &&
                <ActionConfirmation
                    type="buy"
                    amount={amount}
                    reedem={confirmationData.realReedem}
                    maturity={date.end}
                    token={token}
                    offerId={confirmationData.id}
                />
            }
        </>
    )
}
