import { OfferContainer, InfoContent, InfoRow, PopUpBackground, PopUpContainer } from "../Offer/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import { useState, useRef, useEffect } from "react";
import OnClickOutside from "@/hooks/useClickOutside";
import { DealType } from "@/types/deal";
import fixedNumber from "@/helpers/fixedNumber";
import { reedemValue, RefreshValue } from "@/helpers/calculateProfits";
import { reedemEarly } from "./helpers/editDealHelpers";
import ReedemConfirmation from './ReedemConfirmation';
import useUser from "@/hooks/useUser";
import { Contract, formatEther, parseEther, parseUnits } from "ethers";
import LoadingValue from "../LoadingValue";
import { discountContractAddress } from "@/consts/globalConsts";
import {defaultProvider} from "@/hooks/useUser";
import { exampleOffers } from "@/consts/exampleDeals";
import DISCOUNTV1_ABI from "@/artifacts/contracts/DiscountV1.sol/DiscountV1.json"
import { OfferType } from "@/types/offer";
const discountV1ABI = DISCOUNTV1_ABI.abi;

export default function ReedemEarly({
    deal,
} : {
    deal: DealType,
}){
    const offerData = exampleOffers.find(offer => offer.id === deal.offerId) as OfferType;
    const [estimatedReedem, setEstimatedReedem] = useState<number>();
    const [stage, setStage] = useState<null | "confirmation" | {
        reedem: number,
        amount: number
    }>(null);
    const ref: any = useRef();
    OnClickOutside(ref, () => setStage(null));

    useEffect(() => {
        const getReedemEarlyPreview = async() => {
            const discountContract = new Contract(discountContractAddress, discountV1ABI, defaultProvider);
            const previewClaimEarlyAmount = await discountContract.previewClaimPTEarly(
                offerData.curvePool, //curve pool
                1, //i / inputTokenIndex
                0, //j / outputTokenIndex
                BigInt(deal.amountBigIntStringified)
            );
            setEstimatedReedem(Number(formatEther(previewClaimEarlyAmount)))
        }
        getReedemEarlyPreview();
    }, [])


    const reedem = () => {

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
                    <DefaultButton $bg="#7F56D9" $bgHover="#8965d8" $fullWidth style={{padding: '18px 0'}} onClick={() => setStage("confirmation")}>
                        Claim Early
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
                            <span>0.9%</span>
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
                        <DefaultButton $bg="#7F56D9" $bgHover="#8965d8" $fullWidth style={{marginTop: '20px'}} onClick={reedem}>
                        Redeem Early
                    </DefaultButton>
                    </PopUpContainer>
                </PopUpBackground>
                : stage ?
                <ReedemConfirmation
                    type="reedemEarly"
                    {...stage}
                    token={deal.token}
                />
                : null
            }
        </>
    )
}
