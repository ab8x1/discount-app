import styled from "styled-components";

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