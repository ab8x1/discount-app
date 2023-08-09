import { useState } from "react"
import { PopUpBackground, PopUpContainer } from "../DealDetails/DetailsStyles"
import { DefaultButton } from "./NavbarStyles";
import styled from 'styled-components';
import Image from "next/image";

const Title = styled.p`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 20px 0 15px 0;
`

const ContentRow = styled.p`
    color: #475467;
    margin-bottom: 15px;
`

export default function BetaWarning(){
    const [showWarning, setShowWarning] = useState(typeof window !== "undefined" ? !window.sessionStorage?.getItem('hideWarning') : false);

    const close = () => {
        window.sessionStorage.setItem('hideWarning', 'true');
        setShowWarning(false)
    };
    return(
        <>
            {
                showWarning  &&
                <PopUpBackground>
                    <PopUpContainer>
                        <div className="alignY" style={{justifyContent: 'space-between'}}>
                            <Image src="/circle-tick.svg" width={48} height={48} alt="tick"/>
                            <Image src="/x-close.svg" width={24} height={24} alt="tick" style={{cursor: 'pointer'}} onClick={close}/>
                        </div>
                        <Title>Welcome to Discount Beta!</Title>
                        <ContentRow>
                            No need for testnet funds. You can play around in a Web 2.0 fashion, simply connect your wallet and you&apos;re good to go!
                        </ContentRow>
                        <ContentRow>
                            Note this is Beta stage
                        </ContentRow>
                        <DefaultButton
                            $fullWidth $bg="#7F56D9"
                            $bgHover="#8762d6"
                            style={{marginTop: '30px'}}
                            onClick={close}
                        >
                            Got it!
                        </DefaultButton>
                    </PopUpContainer>
                </PopUpBackground>
            }
        </>
    )
}
