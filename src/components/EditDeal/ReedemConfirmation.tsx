import Confetti from 'react-confetti';
import { DefaultButtonLink } from "../Navbar/NavbarStyles";
import { InfoRow, PopUpBackground, PopUpContainer, PopUpContent, Profit } from "@/components/Offer/DetailsStyles";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import fixedNumber from '@/helpers/fixedNumber';

export default function ReedemConfirmation({
    type,
    reedem,
    token,
} : {
    type: "reedemFull" | "reedemEarly",
    reedem: number,
    token: string,
}){
    const params = useSearchParams();
    const returnToPage = params.get('returnToPage');

    return(
        <PopUpBackground>
            <PopUpContainer>
                <Image src="/circle-tick.svg" width={48} height={48} alt='cricle tick'/>
                <h3>Early Claim Complete</h3>
                <PopUpContent>
                    <InfoRow>
                        <span> Received to Wallet </span>
                        <span> {fixedNumber(reedem)} {token} </span>
                    </InfoRow>
                    <DefaultButtonLink href={`/my-earnings?page=${returnToPage || 1}`} $bg="#7F56D9;" $bgHover="#8965d8" $fullWidth style={{marginTop: '20px', padding: '10px'}}>
                        Open My Earnings
                    </DefaultButtonLink>
                </PopUpContent>
            </PopUpContainer>
            <Confetti recycle={false} tweenDuration={10000} numberOfPieces={350}/>
        </PopUpBackground>
    )
}
