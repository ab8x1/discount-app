'use client'
import { DetailsGrid, DetailsContainer, InfoContent, InfoRow, ReversedMobileOrder } from "../DealDetails/DetailsStyles";
import { DefaultButton } from "../Navbar/NavbarStyles";
import EditDealInfo from "./EditDealInfo";
import Image from "next/image";
import DealDetailsProgress from "../DealDetails/DetailsProgress";

export default function EditDeal(){
    return(
        <DetailsGrid>
            <EditDealInfo/>
            <ReversedMobileOrder>
                <DealDetailsProgress
                    amount={1000}
                    dealDetails={{
                        discount: 1,
                        reedem: 1030,
                        earn: 30,
                        roi: 1,
                        date: {
                            start: 1,
                            end: 1718373949000
                        }
                    }}
                    step="wait"
                />
                <DetailsContainer style={{marginTop: '15px'}}>
                    <InfoContent>
                        <h3>Earnings</h3>
                        <InfoRow>
                            <span>Avg. 24hr Profits:</span>
                            <span>0.1818857 USDC</span>
                        </InfoRow>
                        <InfoRow>
                            <span>Total Profits So Far:</span>
                            <span>0.000014 USDC</span>
                        </InfoRow>
                    </InfoContent>
                </DetailsContainer>
            </ReversedMobileOrder>
            <DetailsContainer>
                <InfoContent>
                    <h3>Redeem Early</h3>
                    <InfoRow>
                        <span>Estimated Value</span>
                        <span>1000.000014 USDC</span>
                    </InfoRow>
                    <DefaultButton $bg="#FFB673" $bgHover="#f7bf8a" $fullWidth style={{padding: '15px 0'}}>
                        Redeem Early
                    </DefaultButton>
                </InfoContent>
            </DetailsContainer>
            <DetailsContainer>
                <InfoContent>
                    <h3 className="alignY" style={{gap: '5px'}}>
                        FAQ
                        <Image src="/navicons/faq.svg" width={24} height={24} alt="faq"/>
                    </h3>
                    <p style={{margin: '10px 0'}}>
                        When redeeming early, the amount of tokens you receive will depend on various factors such as time remaining and available liquidity.
                    </p>
                </InfoContent>
            </DetailsContainer>
        </DetailsGrid>

    )
}
