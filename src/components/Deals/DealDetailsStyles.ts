import styled from "styled-components";
import Image from "next/image";

export const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media(min-width: 992px){
        grid-template-columns: 0.6fr 0.4fr;
    }
`
export const DetailsContainer = styled.div`
    border-radius: 15px;
    border: 1px solid #E7E7E7;
    color: #344054;
    font-size: 0.875rem;
    font-weight: 500;
`

export const DetailsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px 15px 0px 0px;
    background: #627EEA;
    padding: 32px 24px;
`
export const Token = styled.div`
    color: white;
    gap: 15px;
    font-size: 1.56rem;
    font-weight: 600;
`

export const TokenImg = styled(Image)`
    padding: 1px;
    border-radius: 50%;
    background-color: white;
`

export const DiscountValue = styled.div`
    display: flex;
    gap: 5px;
    padding: 3px 6px;
    border-radius: 6px;
    border: 1px solid #D0D5DD;
    background: #FFF;
    &::before{
        content: '•';
        color: var(--brand-color);
    }

`

export const DeatilsContent = styled.div`

`

export const InfoRow = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    margin: 0;
    border-bottom: 1px solid #EBEBEB;
`