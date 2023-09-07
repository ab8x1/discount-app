import styled from "styled-components";

export const InputContainer = styled.div`

`

export const InputLabel = styled.label`
    display: block;
    margin-bottom: 10px;
`

export const InputLayout = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    overflow: hidden;
`

export const Input = styled.input`
    width: 100%;
    font-size: 1.25rem;
    font-weight: 600;
    border: none;
    outline: none;
    color: #344054;
    background-color: inherit;
    padding-right: 10px;
`

export const InputToken = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0 18px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    cursor: default;
    & img{
        box-sizing: content-box;
        padding: 10px 0;
    }
`