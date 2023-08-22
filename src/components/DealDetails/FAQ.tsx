import styled from 'styled-components'
import Accordion from './Accordion'

const FaqContainer = styled.div`
    width: 100%;
    margin: 25px 0;
    padding: 0 15px;
    border-radius: 15px;
    border: 1px solid #E4E4E4;
    background: #FFF;
`

export default function Faq(){

    return(
        <FaqContainer>
            <Accordion
                title='Where does the discount come from?'
                content="Discount leverages Spectra's Principal Tokens with zero-coupon mechanics. In traditional finance, this concept is known as bonds, which is one of the most popular fixed-income investment strategies."
            />
            <Accordion
                title='What happens after I make the purchase?'
                content="You will be able to preview its live earnings in your Portfolio. Under the hood, you will receive the full purchased amount in form of Principal Tokens in the following format PT-USDC-RETURN_DATE directly in your wallet, e.g. 1000 PT-USDC-7JAN2025"
            />
            <Accordion
                title='How can I be sure that I will be able to earn the full Fixed Return at Return Date?'
                content="When issuing discounted Principal Tokens, Spectra Protocol locks in the corresponding amount of underlying tokens such as USDC or ETH. Principal Tokens are programmed to be redeemable 1:1 for underlying token such as USDC or ETH. Thus, they entitle its holder to a fixed return at a specific date in the future."
            />
            <Accordion
                title='Can I redeem my discounted crypto before the Return Date?'
                content="Yes, purchased offer can be redeemed before the Return Date. However, the amount of tokens you will receive can depend on various factors such as time remaining and available liquidity. After purchasing the offer, you will be able to preview it via Portfolio page where a ‘Redeem Early’ option will be available. "
            />
        </FaqContainer>
    )
}
