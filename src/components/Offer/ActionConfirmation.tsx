import Confetti from 'react-confetti';
import { DefaultButtonLink } from "../Navbar/NavbarStyles";
import { InfoRow, PopUpBackground, PopUpContainer, PopUpContent, Profit } from "./DetailsStyles";
import { useSearchParams } from "next/navigation";
import timestampToDate from '@/helpers/timestampToDate';
import Image from 'next/image';
import fixedNumber from '@/helpers/fixedNumber';

export default function ActionConfirmation({
    type,
    amount,
    reedem,
    token,
    maturity,
    offerId
} : {
    type: "buy" | "reedemFull" | "reedemEarly",
    amount: number,
    reedem: number,
    token: string,
    maturity: number,
    offerId: string
}){
    const params = useSearchParams();
    const returnToPage = params.get('returnToPage');

    return(
        <PopUpBackground>
            <PopUpContainer>
                <Image src="/circle-tick.svg" width={48} height={48} alt='cricle tick'/>
                <h3>Purchase Complete</h3>
                <PopUpContent>
                    <InfoRow>
                        <span> You Paid </span>
                        <span> {amount} {token} </span>
                    </InfoRow>
                    <InfoRow>
                        <span> You’ll Receive </span>
                        <span> {reedem} {token} </span>
                    </InfoRow>
                    <InfoRow>
                        <span> Claim Date </span>
                        <span> {timestampToDate( type === "buy" ? maturity : Date.now())} </span>
                    </InfoRow>
                    <Profit>
                        <Image src="/thumbs-up.svg" width={20} height={20} alt="thumbs-up"/>
                        You’re saving ${fixedNumber(reedem - amount)} on this deal
                    </Profit>
                    <DefaultButtonLink href={`/offer/${offerId}?returnToEarnings=${returnToPage || 1}`} $bg="#00D26B;" $bgHover="#23c677" $fullWidth style={{marginTop: '20px', padding: '10px'}}>
                        Open Purchase Summary
                    </DefaultButtonLink>
                </PopUpContent>
            </PopUpContainer>
            <Confetti recycle={false} tweenDuration={10000} numberOfPieces={350}/>
        </PopUpBackground>
    )
}
