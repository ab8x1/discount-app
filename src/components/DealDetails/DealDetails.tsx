'use client'
import { useState } from "react"
import { DetailsPage, DetailsGrid, DealContainer, DealGrid, InfoContent, InfoRow, DealContent } from "./DetailsStyles"
import DealDetailsProgress from "./DetailsProgress"
import DealDetails from "./Details"
import { DealType } from "@/types/deal"
import { DealDetailsType, Stage } from "./DetailsTypes"
import Image from "next/image"
import BackButton from "../Navbar/BackButton"
import PreviewDiscountedAsset from "../previewDiscountedAsset/PreviewDiscountedAsset"

export default function DetailsState({
    thinDeal
} : {
    thinDeal: DealType
}){
    const {discountedPrice, originalPrice, date, token, chainHexId} = thinDeal;
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
        token,
        chainHexId
    }
    return(
        <DetailsPage>
            <PreviewDiscountedAsset dealInfo={thinDeal}/>
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
