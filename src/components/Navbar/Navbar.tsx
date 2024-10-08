'use client'
import { useState, useRef } from "react";
import { TopNav, Logo, LogoIcon } from "./NavbarStyles";
import NavbarToogle from "./NavbarToogle";
import Toggler from "./Toggler";
import useClickOutside from '../../hooks/useClickOutside';
import { useConnectWallet } from '@web3-onboard/react';
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import ChainSelector from "../ChainSelector";
import BetaWarning from "./BetaWarning";

export default function Navbar(){
    const [opened, setOpened] = useState(false);
    const [{ wallet }] = useConnectWallet();
    const toogleNavRef = useRef<HTMLDivElement>(null);
    useClickOutside(toogleNavRef, () => close());

    const toogle = () => {
        const body = document.querySelector('body');
        if(!opened){
            if(body) body.style.overflow = 'hidden';
            setOpened(true);
        }
        else close();
    }
    const close = () => {
        const body = document.querySelector('body');
        setOpened(false);
        if(body) body.style.overflow = 'auto';
    }

    return(
        <>
            <nav ref={toogleNavRef}>
                <TopNav className="container">
                    <div className="alignY">
                        <Logo className="hide-lg-desktop">
                            <LogoIcon href="/">
                                <Image src="/logo.svg" alt="YieldFlipper" width={41} height={41} priority/>
                                <span className="hide-mobile">Discount</span>
                            </LogoIcon>
                        </Logo>
                    </div>
                    <div className="alignY" style={{gap: '0 15px'}}>
                        <ChainSelector/>
                        { !wallet &&
                            <div className="hide-mobile">
                                <ConnectWallet/>
                            </div>
                        }
                        <Toggler opened={opened} toogle={toogle}/>
                    </div>
                </TopNav>
                <NavbarToogle opened={opened} close={close} wallet={wallet}/>
            </nav>
            {/* <BetaWarning/> */}
        </>
    )
}