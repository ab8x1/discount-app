import styled, {css} from "styled-components";
import Image from "next/image";

export const ChainSelectorContainer = styled.div`
    position: relative;
`

export const chainStyles = css`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
`
export const SelectedChain = styled.div`
    ${chainStyles}
`

export const Chain = styled.li`
    ${chainStyles}
    margin-top: 10px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    &:hover{
        background: rgba(0, 0, 0, 0.2);
    }
`

export const Chevron = styled(Image)<{$isOpen: boolean}>`
    transform: ${({$isOpen}) => $isOpen ? 'rotate(90deg)' : 'rotate(-90deg)'};
    transition: transform 0.2s ease-in-out;
`

export const ChainSelectorList = styled.ul<{$isOpen: boolean}>`
    display: ${({$isOpen}) => $isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 15px;
    border-radius: 10px;
    overflow: hidden;
`

