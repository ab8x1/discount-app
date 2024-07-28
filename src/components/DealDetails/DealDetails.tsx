'use client'
import { useEffect, useState } from "react"
import { DetailsPage, DetailsGrid, DealContainer, DealGrid, InfoContent, InfoRow, DealContent } from "./DetailsStyles"
import DealDetailsProgress from "./DetailsProgress"
import DealDetails from "./Details"
import { ThinDealType } from "@/types/deal"
import { DealDetailsType, Stage } from "./DetailsTypes"
import Image from "next/image"
import fixedNumber from "@/helpers/fixedNumber"
import BackButton from "../Navbar/BackButton"
import {BrowserProvider} from "ethers"
import { useConnectWallet } from "@web3-onboard/react"

export default function DetailsState({
    thinDeal
} : {
    thinDeal: ThinDealType
}){
    const [{ wallet }, connect] = useConnectWallet();
    const {discountedPrice, originalPrice, date, token} = thinDeal;
    const [amount, setAmount] = useState<number>(0);
    const [stage, setStage] = useState<Stage>("buy");
    const discount = 100 - (discountedPrice / originalPrice) * 100;
    const profit = amount * discount / 100;
    const dealDetails : DealDetailsType = {
        discount,
        reedem: amount + profit,
        earn: profit,
        roi: discount,
        date,
        token
    }
    useEffect(() => {
        if (wallet) {
            const ethersProvider = new BrowserProvider(wallet.provider, 'any');
            console.log(ethersProvider);
        }
    }, [])
    return(
        <DetailsPage>
            <DetailsGrid $summary={stage==='confirm'}>
                <BackButton/>
                <DealGrid $summary={stage==='confirm'}>
                    <DealDetails setAmount={setAmount} dealDetails={dealDetails} stage={stage} amount={amount} setStage={setStage}/>
                    { stage === 'confirm' &&
                        <div>
                            <DealDetailsProgress amount={amount} dealDetails={dealDetails} step="buy" token={token}/>
                            <DealContainer style={{marginTop: '15px'}}>
                                <InfoContent>
                                    <h3 className="alignY" style={{gap: '5px'}}>
                                        <Image src="/shield-tick.svg" width={24} height={24} alt="shield"/>
                                        <span className="brand">Redeem Anytime</span>
                                    </h3>
                                    <p style={{margin: '10px 0'}}>
                                    You redeem your funds anytime before Claim Date via <b>My Earnings</b> page.
                                    </p>
                                </InfoContent>
                            </DealContainer>
                        </div>
                    }
                </DealGrid>
            </DetailsGrid>
        </DetailsPage>
    )
}
