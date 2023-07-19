import styled from "styled-components";
import { useState, useRef } from "react";
import Image from "next/image";

const Container = styled.div`
    padding: 20px 15px;
    border-top: 1px solid #EAECF0;
    &:first-of-type{
        border-top: none;
    }
`

const Title = styled.div<{$opened: boolean}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    user-select: none;
`

const Body = styled.div<{$height: number}>`
    height: ${({$height}) => $height};
    padding-top: ${({$height}) => $height > 0 ? '20px' : 0};
    overflow: hidden;
`

function Accordion({
    title,
    content
} : {
    title: string,
    content: string | TrustedHTML
}){
    const [height, setHeight] = useState(0);
    const ref: any = useRef();

    const toogle = () => {
        if(height > 0){
            setHeight(0);
        }
        else setHeight(ref.current.scrollHeight);
    }

    return(
        <Container>
            <Title onClick={toogle} $opened={height > 0}> {title} <Image src={`/${height > 0 ? 'minus' : 'plus'}.svg`} width={24} height={24} alt="toogle button"/></Title>
            <Body ref={ref} $height={height} dangerouslySetInnerHTML={{
                __html: content
            }}/>
        </Container>
    )
}
export default Accordion;