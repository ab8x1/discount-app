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
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere debitis, nemo ipsa optio magni omnis minima, iste non veniam officiis et eaque amet architecto maiores harum voluptate aliquid ducimus a."
            />
            <Accordion
                title='What happens after I make the purchase?'
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere debitis, nemo ipsa optio magni omnis minima, iste non veniam officiis et eaque amet architecto maiores harum voluptate aliquid ducimus a."
            />
            <Accordion
                title='How can I be sure that I will be able to earn the full Fixed Return at Return Date?'
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere debitis, nemo ipsa optio magni omnis minima, iste non veniam officiis et eaque amet architecto maiores harum voluptate aliquid ducimus a."
            />
            <Accordion
                title='Can I redeem my discounted crypto before the Return Date?'
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere debitis, nemo ipsa optio magni omnis minima, iste non veniam officiis et eaque amet architecto maiores harum voluptate aliquid ducimus a."
            />
        </FaqContainer>
    )
}
