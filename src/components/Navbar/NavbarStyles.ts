import styled, {css} from "styled-components";
import Link from "next/link";

export const TopNav = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EAECF0;
    align-items: center;
    padding: 10px;
    min-height: 70px;
    @media(min-width: 768px){
        justify-content: flex-end;
        border-bottom: none;
        padding: 30px 10px;
        min-height: 108px;
    }
`

export const NavToogle = styled.aside<{$opened: boolean, $scrollY: number}>`
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    width: 280px;
    top: ${({$scrollY}) => `${70-$scrollY}px`};
    bottom: 0;
    transform: translateX( ${({$opened}) => $opened ? '0%' : '-100%'} );
    transition: transform 0.3s ease-in-out;
    z-index: 10;
    border-radius: 0px 25px 0px 0px;
    border-right: 2px solid #EAECF0;
    background: #F6F9FF;
    @media(min-width: 768px){
        top: 0;
        transform: unset;
    }
`

export const Logo = styled.div<{$toogleNav?: boolean}>`
    position: relative;
    ${({$toogleNav}) => $toogleNav && `
        padding: 30px;
        @media(max-width: 767px){
            display: none;
        }
    `}
`

export const LogoIcon = styled(Link)`
    display: flex;
    align-items: center;
    color: var(--brand-color);
    font-size: 1.25rem;
    font-weight: 700;
    & img{
        width: 41px;
        height: 41px;
        margin-right: 12px;
    }
`

export const defaultButtonCSS = css<{$disabled?: boolean, $bg?: string, $bgHover?: string, $fullWidth?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 8px;
    background-color: ${({$bg}) => $bg ? $bg : '#93C86C'};
    color: white;
    border-radius: 9px;
    padding: 12px 21px;
    font-size: 1rem;
    font-weight: 600;
    ${({$fullWidth}) => $fullWidth && 'width: 100%;'}
    text-align: center;
    transition: background-color 0.2s ease-in-out;
    &:hover{
        background-color: ${({$bgHover}) => $bgHover ? $bgHover : '#A9E27E'};
    }
    ${({$disabled}) => $disabled && `
        pointer-events: none;
        opacity: 0.8;
        user-select: none;
        background-color: #dedddc;
    `}
`

export const DefaultButton = styled.button<{$disabled?: boolean, $bg?: string, $bgHover?: string, $fullWidth?: boolean}>`
    ${defaultButtonCSS}
`

export const DefaultButtonLink = styled(Link)<{$disabled?: boolean, $bg?: string, $bgHover?: string, $fullWidth?: boolean}>`
    ${defaultButtonCSS}
`

export const Menus = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    & ul:first-of-type{
        flex: 1;
    }
`

export const Menu = styled.ul`
    list-style: none;
    margin-top: 30px;
    @media(min-width: 768px){
        &:first-of-type{
            margin-top: 0;
        }
    }
`

export const MenuItem = styled.li<{$active?: boolean}>`
    position: relative;
    margin-bottom: 5px;
    padding: 0 13px;
    ${({$active}) => $active && `
        &::before{
            content: '';
            position: absolute;
            left: 0;
            width: 6px;
            top: 0;
            height: 100%;
            background: var(--brand-color);
        }
    `}
`

const linkStyles = css<{$active?: boolean}>`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 12px;
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 6px;
    &:hover{
        background: #F3F3F3;
    }
`

export const MenuLnik = styled(Link)<{$active: boolean, $isEmbeded?: boolean, $hasChildren?: boolean}>`
    ${linkStyles}
`

export const RawMenuLink = styled.a`
    ${linkStyles}
    color: #344054;
`

export const ButtonMenuLink = styled.button`
    ${linkStyles}
`