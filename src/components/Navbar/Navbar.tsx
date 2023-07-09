'use client'
import { useState, useRef, memo } from "react";
import { TopNav, Logo, LogoIcon } from "./NavbarStyles";
import NavbarToogle from "./NavbarToogle";
import Toggler from "./Toggler";
import useClickOutside from '../../hooks/useClickOutside';
import { useConnectWallet } from '@web3-onboard/react';
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";

function Navbar(){ console.log('Navbar');
    const [opened, setOpened] = useState(false);
    const [{ wallet }, connect] = useConnectWallet();
    const toogleNavRef = useRef<HTMLDivElement>(null);
    useClickOutside(toogleNavRef, () => close());

    const toogle = () => {
        const body = document?.querySelector('body');
        if(!opened){
            if(body) body.style.overflow = 'hidden';
            setOpened(true);
        }
        else close();
    }
    const close = () => {
        const body = document?.querySelector('body');
        setOpened(false);
        if(body) body.style.overflow = 'auto';
    }

    return(
        <nav ref={toogleNavRef}>
            <TopNav className="container">
                <Logo className="hideDesktop">
                    <LogoIcon href="/">
                        <Image src="/logo.svg" alt="YieldFlipper" width={41} height={41}/>
                    </LogoIcon>
                </Logo>
                <div className="alignY" style={{gap: '0 15px'}}>
                    { !wallet &&
                        <div className="hideMobile">
                            <ConnectWallet/>
                        </div>
                    }
                    <Toggler opened={opened} toogle={toogle}/>
                </div>
            </TopNav>
            <NavbarToogle opened={opened} close={close} wallet={wallet}/>
        </nav>
    )
}
export default memo(Navbar);