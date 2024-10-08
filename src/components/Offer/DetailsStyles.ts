import styled from "styled-components";
import Image from "next/image";

export const OfferPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    @media(min-width: 768px){
        padding-bottom: 12vh;
    }
`

export const OfferGrid = styled.div<{$summary?: boolean}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${({$summary}) => $summary ? '900px' : '480px'};
    @media(min-width: 768px){
        min-height: 590px;
    }
`

export const OfferDetailsGrid = styled.div<{$summary?: boolean}>`
    display: grid;
    /* height: 100%; */
    width: 100%;
    grid-template-columns: 1fr;
    gap: 25px 30px;
    margin-top: 30px;
    @media(min-width: 768px){
        ${({$summary}) => $summary && `
            grid-template-columns: 0.55fr 0.45fr;
        `}
    }
`

export const OfferDetailsWrapper = styled.div`
    width: 100%;
`

export const ReversedMobileOrder = styled.div`
    @media(max-width: 767px){
        order: 2;
    }
`

export const OfferContainer = styled.div`
    border-radius: 15px;
    color: #344054;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: white;
    /* border: 1px solid #E7E7E7; */
    box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -1px rgba(16, 24, 40, 0.08);
`

export const OfferHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px 15px 0px 0px;
    padding: 24px;
    border-bottom: 1px solid #EBEBEB;
`
export const Token = styled.div`
    font-size: 1.25rem;
    gap: 10px;
    font-weight: 600;
`
export const TokenContainer = styled.div`
    position: relative;
    font-size: 1.56rem;
    font-weight: 600;
    & span{
        position: absolute;
        right: 2px;
        top: 0px;
    }
`


export const TokenImg = styled(Image)`
    padding: 4px;
    border-radius: 50%;
    background-color: white;
`

export const DiscountValue = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    padding: 3px 6px;
    font-weight: 500;
    border-radius: 6px;
    border: 1px solid #D0D5DD;
    background: #fff;
    min-width: 67px;
    & span{
        content: '•';
        color: var(--brand-color);
    }
`

export const OfferContent = styled.div`
    padding: 15px 24px;
`

export const InfoContent = styled.div`
    padding: 20px 15px;
    color: #475467;
`

export const InfoRow = styled.div<{$borderTop?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    margin: 0;
    ${({$borderTop}) => $borderTop && `
        border-top: 1px solid #EBEBEB;
    `}
    &:first-of-type{
        padding-top: 0;
    }
    & span:last-of-type{
        font-weight: 600;
    }
`

export const Profit = styled.div`
    display: flex;
    width: 100%;
    margin-top: 15px;
    padding: 16px;
    align-items: center;
    gap: 12px;
    border-radius: 12px;
    border: 1px solid #6CE9A6;
    background: #F6FEF9;
    color: #027A48;
    font-weight: 600;
`

export const PopUpBackground = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.20);
    z-index: 150;
`

export const PopUpContainer = styled.div`
    width: 100%;
    max-width: 400px;
    border-radius: 15px;
    padding: 25px 15px;
    border: 1px solid #E4E4E4;
    background: #FFF;
    & h3{
        align-self: flex-start;
        margin: 20px 0 25px 0;
        font-size: 1.25;
    }
`

export const PopUpContent = styled.div`
    display: flex;
    flex-direction: column;
`

export const ProgressContainer = styled.div`
    font-size: 0.87rem;
    border-radius: 15px;
    /* border: 1px solid #E4E4E4; */
    box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -1px rgba(16, 24, 40, 0.08);
    background: #FFF;
    padding: 15px;
`

export const ProgressTitle = styled.h3`
    display: block;
    color: #000;
    margin-bottom: 20px;
`
export const StageButton = styled.span<{$disabled?: boolean}>`
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #627EEA;
    background: #627EEA;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    margin-right: 12px;
    ${({$disabled}) => $disabled && `
        pointer-events: none;
        opacity: 0.8;
        user-select: none;
        background-color: #dedddc;
        border: none;
    `}
    &:hover{
        background: #6f88e8;
    }
    & img{
        transform: rotate(180deg);
    }
`

export const Step = styled.div<{$status: "fullfilled" | "filled" | "next" | "pending"}>`
    position: relative;
    display: flex;
    gap: 12px;
    margin: 0;
    padding: 0 0 24px 0;
    color: #475467;
    & p:first-of-type{
        color: #1E1D34;
        font-weight: 600;
    }
    & span{
        font-weight: 700;
    }
    &::before{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        border-radius: 50%;
        width: 24px;
        height: 22px;
        padding-bottom: 2px;
        color: ${({$status}) => $status === "pending" ? "#EAECF0" : "var(--brand-color)"};
        background: ${({$status}) => ($status === "filled" || $status === "fullfilled") ? '#CCF6E1' : $status === 'next' ? '#F5FFF5' : '#FAFAFA'};
        box-shadow: ${({$status}) => $status === "pending" ? "none" : "0px 0px 0px 4px #F4EBFF"};
        z-index: 10;
        ${({$status}) => {
            if($status === "fullfilled") return`
                content: url('/check.svg');
                height: 19px;
                padding-top: 3px;
            `
            else return `
                content: "•";
            `
        }}
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