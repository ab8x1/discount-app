'use client'
import { useEffect, useState } from "react"
import { OfferPage, OfferGrid, OfferContainer, OfferDetailsGrid, InfoContent, InfoRow, OfferContent } from "./DetailsStyles"
import OfferDetailsProgress from "./DetailsProgress"
import OfferDetails from "./OfferDetails"
import { OfferType } from "@/types/offer"
import { DealDetailsType, Stage } from "./DetailsTypes"
import Image from "next/image"
import BackButton from "../Navbar/BackButton"
import previewDiscountedAsset from "@/helpers/previewDiscountedAsset"

export default function Offer({
    offerData
} : {
    offerData: OfferType
}){
    const {date, token, chainHexId, id} = offerData;
    const [amount, setAmount] = useState<number>(1);
    const [discountedAsset, setDiscountedAsset] = useState<number | null>(null);
    const [stage, setStage] = useState<Stage>("buy");
    const discount = discountedAsset ? ((discountedAsset - amount) / discountedAsset) * 100 : null;
    const profit = discountedAsset ? discountedAsset - amount : null;
    const dealDetails : DealDetailsType = {
        offerId: id,
        discount,
        reedem: discountedAsset,
        earn: profit,
        roi: discount,
        date,
        token,
        chainHexId
    }

    const changeAmount = (amount: number) => {
        setDiscountedAsset(null);
        setAmount(amount);
    }

    useEffect(() => {
        let isLatest = true;

        const calculateDiscount = async () => {
            if(amount > 0){
                const currentAmount = amount;
                const previewAsset = await previewDiscountedAsset(offerData, currentAmount);
                if (previewAsset !== null && isLatest) {
                    setDiscountedAsset(previewAsset.userWillGet);
                }
            }
        };

        calculateDiscount();

        return () => {
            isLatest = false;
        };
    }, [amount]);

    return(
        <OfferPage>
            <OfferGrid $summary={stage==='confirm'}>
                <BackButton/>
                <OfferDetailsGrid $summary={stage==='confirm'}>
                    <OfferDetails setAmount={changeAmount} dealDetails={dealDetails} stage={stage} amount={amount} setStage={setStage} offerData={offerData}/>
                    { stage === 'confirm' &&
                        <div>
                            <OfferDetailsProgress amount={amount} dealDetails={dealDetails} step="buy" token={token}/>
                            <OfferContainer style={{marginTop: '15px'}}>
                                <InfoContent>
                                    <h3 className="alignY" style={{gap: '5px'}}>
                                        <Image src="/shield-tick.svg" width={24} height={24} alt="shield"/>
                                        <span className="brand">Redeem Anytime</span>
                                    </h3>
                                    <p style={{margin: '10px 0'}}>
                                    You redeem your funds anytime before Claim Date via <b>My Earnings</b> page.
                                    </p>
                                </InfoContent>
                            </OfferContainer>
                        </div>
                    }
                </OfferDetailsGrid>
            </OfferGrid>
        </OfferPage>
    )
}
