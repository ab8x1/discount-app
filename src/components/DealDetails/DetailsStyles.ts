import styled from "styled-components";
import Image from "next/image";

export const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px 30px;
    /* align-items: flex-start; */
    @media(min-width: 768px){
        grid-template-columns: 0.6fr 0.4fr;
    }
`

export const ReversedMobileOrder = styled.div`
    @media(max-width: 767px){
        order: 2;
    }
`

export const DetailsContainer = styled.div`
    border-radius: 15px;
    border: 1px solid #E7E7E7;
    color: #344054;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: white;
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
    padding: 0 15px;
`

export const InfoContent = styled.div`
    padding: 25px 15px;
`

export const InfoRow = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin: 0;
    border-bottom: 1px solid #EBEBEB;
    &:last-of-type{
        border-bottom: none;
    }
`

export const Confirmation = styled.div`
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

export const ConfirmationMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 430px;
    border-radius: 15px;
    padding: 15px;
    border: 1px solid #E4E4E4;
    background: #FFF;
    font-size: 1.3rem;
    text-align: center;
    font-weight: 600;
    line-height: 1.8rem;
    & p{
        align-self: flex-start;
        margin-bottom: 20px;
        font-size: 0.9rem;
    }
`

export const ProgressContainer = styled.div`
    font-size: 0.87rem;
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
export const StageButton = styled.span`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #344054;
    border-radius: 0px 0px 0px 9px;
    cursor: pointer;
    &:hover{
        background: #42526b;
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
    & p:first-of-type{
        font-weight: 600;
    }
    & span{
        font-weight: 700;
    }
    &::before{
        ${({$status}) => {
            if($status === "fullfilled") return`
                content: url('/check.svg');
            `
            else return `
                content: "•";
            `
        }}
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        border-radius: 50%;
        width: 24px;
        height: 22px;
        padding-bottom: 2px;
        color: ${({$status}) => $status === "pending" ? "#EAECF0" : "var(--brand-color)"};
        background: ${({$status}) => ($status === "filled" || $status === "fullfilled") ? '#C0F599' : $status === 'next' ? '#F5FFF5' : '#FAFAFA'};
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