import styled from "styled-components";
import Image from "next/image";

export const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    align-items: flex-start;
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

export const ProgressContainer = styled.div`
    border-radius: 15px;
    border: 1px solid #E4E4E4;
    background: #FFF;
    padding: 15px;
`

export const ProgressTitle = styled.div`
    display: block;
    color: #000;
    font-weight: 600;
    margin-bottom: 15px;
`

export const Step = styled.div<{$status: "filled" | "next" | "pending"}>`
    position: relative;
    display: flex;
    /* align-items: center; */
    gap: 12px;
    margin: 0;
    padding: 0 0 24px 0;
    & p:first-of-type{
        font-weight: 600;
    }
    & span{
        font-weight: 700;
    }
    &::before{
        content: '•';
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        border-radius: 50%;
        width: 24px;
        height: 22px;
        padding-bottom: 2px;
        color: ${({$status}) => $status === "pending" ? "#EAECF0" : "var(--brand-color)"};
        background: ${({$status}) => $status === "filled" ? '#C0F599' : $status === 'next' ? '#F5FFF5' : '#FAFAFA'};
        box-shadow: ${({$status}) => $status === "pending" ? "none" : "0px 0px 0px 4px #F4EBFF"};
        z-index: 10;
    }
    &:last-of-type::after{
        display: none;
    }
    &::after{
        content: '';
        position: absolute;
        left: 11px;
        top: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        background-color: ${({$status}) => $status === "filled" ? 'var(--brand-color)' : '#EAECF0'};
    }
    &:last-of-type{
        padding: 0;
    }
`