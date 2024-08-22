import { OfferContainer, InfoContent, InfoRow, PopUpBackground, PopUpContainer } from "../Offer/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useState, useRef, useEffect } from "react";
import OnClickOutside from "@/hooks/useClickOutside";
import { DealType } from "@/types/deal";
import fixedNumber from "@/helpers/fixedNumber";
import ReedemConfirmation from './ReedemConfirmation';
import LoadingValue from "../LoadingValue";
import { exampleOffers } from "@/consts/exampleDeals";
import { OfferType } from "@/types/offer";
import reedemEarlyPreview from "@/helpers/reedemEarlyPreview";
import { UserType } from "@/hooks/useUser";
import reedemOrClaimEarly from "@/helpers/reedemOrClaimEarly";


export default function ReedemEarly({
    deal,
    user
} : {
    deal: DealType,
    user: UserType
}){
    const offerData = exampleOffers.find(offer => offer.id === deal.offerId) as OfferType;
    const [estimatedReedem, setEstimatedReedem] = useState<number>();
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState<null | "confirmation" | {
        reedem: number,
    }>(null);
    const ref: any = useRef();
    OnClickOutside(ref, () => setStage(null));

    useEffect(() => {
        const getReedemEarlyPreview = async() => {
            const reedemPreview = await reedemEarlyPreview(offerData, BigInt(deal.amountBigIntStringified));
            setEstimatedReedem(reedemPreview);
        }
        getReedemEarlyPreview();
    }, [])


    const reedem = async () => {
        if(user && estimatedReedem){
            setLoading(true);
            const reedem = await reedemOrClaimEarly(user, offerData, deal, estimatedReedem);
            if(reedem !== null){
                const {value, message} = reedem;
                if(message) window.alert(message);
                setStage({reedem: value})
            }
            else {
                window.alert("Sorry, something went wrong, try again soon");
                console.log("error");
            }
            setLoading(false);
        }
    }

    return(
        <>
            <OfferContainer>
                <InfoContent>
                    <h3>Claim Early</h3>
                    <InfoRow style={{margin: '15px 0'}}>
                        <span>Estimated Value</span>
                        <div className="alignY" style={{color: '#7F56D9'}}>
                            {
                                <LoadingValue
                                    isLoading={!estimatedReedem}
                                    value={fixedNumber(estimatedReedem || 1, false, 4)}
                                    loaderColor="#7F56D9"
                                    loaderWidth={15}
                                    loaderHeight={15}
                                />
                            }
                            <span style={{marginLeft: '5px'}}>
                                {deal.token}
                            </span>
                        </div>
                    </InfoRow>
                    <DefaultButton $bg="#7F56D9" $bgHover="#8965d8" $fullWidth style={{padding: '18px 0'}} onClick={() => setStage("confirmation")} $disabled={loading}>
                        Claim Early
                        <LoadingValue
                            isLoading={loading}
                            value=""
                            loaderColor="white"
                            loaderHeight={10}
                            loaderWidth={20}
                        />
                    </DefaultButton>
                </InfoContent>
            </OfferContainer>
            {
                stage === "confirmation" ?
                <PopUpBackground>
                    <PopUpContainer ref={ref} style={{fontSize: '0.9rem'}}>
                        <h3 style={{fontSize: '1.12rem'}}>Claim Early</h3>
                        <InfoRow>
                            <span>Estimated Value</span>
                            <span>
                                <LoadingValue
                                    isLoading={!estimatedReedem}
                                    value={fixedNumber(estimatedReedem || 1, false, 4)}
                                    loaderColor="#7F56D9"
                                    loaderWidth={5}
                                />
                               <span style={{marginLeft: '5px'}}>{deal.token}</span>
                            </span>
                        </InfoRow>
                        <InfoRow>
                            <span>Platform Fee</span>
                            <span>0.0%</span>
                        </InfoRow>
                        <InfoRow>
                            <span>Minimum Received</span>
                            <div>
                                <span className="brand">
                                    {estimatedReedem && fixedNumber(estimatedReedem, false, 4)}
                                    <span style={{marginLeft: '5px'}}>{deal.token}</span>
                                </span>
                            </div>
                        </InfoRow>
                        <DefaultButton $bg="#7F56D9" $bgHover="#8965d8" $fullWidth style={{marginTop: '20px'}} onClick={reedem} $disabled={loading}>
                        Redeem Early
                        <LoadingValue
                            isLoading={loading}
                            value=""
                            loaderColor="white"
                            loaderHeight={10}
                            loaderWidth={20}
                        />
                    </DefaultButton>
                    </PopUpContainer>
                </PopUpBackground>
                : stage ?
                <ReedemConfirmation
                    {...stage}
                    token={deal.token}
                />
                : null
            }
        </>
    )
}
