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

export const InputContainer = styled.div`
    margin-top: 15px;
`

export const InputLabel = styled.label`
    display: block;
    margin-bottom: 10px;
`

export const InputLayout = styled.div`
    position: relative;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #00D26B;
    background: #E2FFDB;
    padding-right: 100px;
    overflow: hidden;
`

export const Input = styled.input`
    width: 100%;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    padding: 12px 14px;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    outline: none;
    background-color: inherit;
`

export const InputToken = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    gap: 5px;
    border-left: 1px solid #00D26B;
    padding: 10px 8px;
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

export const Step = styled.p`
    position: relative;
    display: flex;
    /* align-items: center; */
    gap: 12px;
    margin: 0;
    padding: 0 0 24px 0;
    & span:first-of-type{
        font-weight: 600;
    }
    & span{
        display: block;
    }
    &::before{
        content: '•';
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--brand-color);
        border-radius: 50%;
        width: 24px;
        height: 22px;
        padding-bottom: 2px;
        background: #C0F599;
        box-shadow: 0px 0px 0px 4px #F4EBFF;
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
        background-color: var(--brand-color);
    }
    &:last-of-type{
        padding: 0;
    }
`