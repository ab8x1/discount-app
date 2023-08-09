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
    const [showWarning, setShowWarning] = useState(true);
    const close = () => setShowWarning(false);
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
                            Discover the platform and buy your first discounted crypto!
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
