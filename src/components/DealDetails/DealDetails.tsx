'use client'
import { useEffect, useState } from "react"
import { DetailsPage, DetailsGrid, DealContainer, DealGrid, InfoContent, InfoRow, DealContent } from "./DetailsStyles"
import DealDetailsProgress from "./DetailsProgress"
import DealDetails from "./Details"
import { DealType } from "@/types/deal"
import { DealDetailsType, Stage } from "./DetailsTypes"
import Image from "next/image"
import BackButton from "../Navbar/BackButton"
import previewDiscountedAsset from "@/helpers/previewDiscountedAsset"

export default function DetailsState({
    thinDeal
} : {
    thinDeal: DealType
}){
    const {date, token, chainHexId} = thinDeal;
    const [amount, setAmount] = useState<number>(1);
    const [discountedAsset, setDiscountedAsset] = useState<number | null>(null);
    const [stage, setStage] = useState<Stage>("buy");
    const discount = discountedAsset ? ((discountedAsset - amount) / discountedAsset) * 100 : null;
    const profit = discountedAsset ? discountedAsset - amount : null;
    const dealDetails : DealDetailsType = {
        discount,
        reedem: discountedAsset,
        earn: profit,
        roi: discount,
        date,
        token,
        chainHexId
    }

    useEffect(() => {
        const calculateDiscount = async () => {
            setDiscountedAsset(null);
            if(amount > 0){
                const userWillGet = await previewDiscountedAsset(thinDeal, amount);
                setDiscountedAsset(userWillGet);
            }
        }
        calculateDiscount();
    }, [amount])

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
