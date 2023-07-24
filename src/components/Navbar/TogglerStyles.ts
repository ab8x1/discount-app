import styled from "styled-components";

export const TogglerButton = styled.div`
    width: 22px;
    height: 18px;
    margin-bottom: 5px;
    background: #FFFFFF;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    @media(min-width: 992px){
        display: none;
    }
`

export const TogglerContainer = styled.div<{$opened: boolean}>`
    position: relative;
    width: 100%;
    height: 100%;
    & span{
        background-color: #6F7177;
    }
    & span:nth-of-type(1){
        opacity: ${({$opened}) => $opened ? '0' : '1'};
        top: 0;
    }
    & span:nth-of-type(2){
        top: 50%;
        ${({$opened}) => $opened && 'transform: rotate(45deg)'};
    }
    & span:nth-of-type(3){
        top: 100%;
        ${({$opened}) => $opened && `
            top: 50%;
            transform: rotate(-45deg);
        `}
    }

`

export const Bar = styled.span`
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: black;
    transition: all 0.2s ease-in-out;
`