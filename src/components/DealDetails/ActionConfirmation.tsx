import Confetti from 'react-confetti';
import { DefaultButtonLink } from "../Navbar/NavbarStyles";
import { PopUpBackground, PopUpContainer, PopUpContent } from "./DetailsStyles";

export default function ActionConfirmation({
    type,
    reedem,
    amount
} : {
    type: "buy" | "reedemFull" | "reedemEarly",
    reedem: number,
    amount: number
}){
    return(
        <PopUpBackground>
            <PopUpContainer>
                <h3>Woohoo!</h3>
                <PopUpContent>
                    <div>{type === "buy" ? "You’ve Purchased" : type === "reedemFull" ? "You’ve redeemead" : "You’ve redeemead early"}</div>
                    <div><span style={{color: '#627EEA'}}>{reedem} Discounted USDC</span></div>
                    <div>for <span className="brand">{amount} USDC</span></div>
                    <DefaultButtonLink href="/my-earnings" $bg="#344054;" $bgHover="#43526c" $fullWidth style={{marginTop: '20px'}}>
                        Close & {type === "buy" ? 'Open' : 'Return to'} My Earnings
                    </DefaultButtonLink>
                </PopUpContent>
            </PopUpContainer>
            <Confetti recycle={false} tweenDuration={10000} numberOfPieces={350}/>
        </PopUpBackground>
    )
}
