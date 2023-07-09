import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import { NavToogle, Logo, LogoIcon, Menus, Menu, MenuItem, MenuLnik, RawMenuLink } from "./NavbarStyles";
import Image from "next/image";
import ConnectWallet from "./ConnectWallet";

function NavbarToogle({
    opened,
    close
} : {
    opened: boolean,
    close: () => void
}){ console.log('NavbarToogle');
    const url = usePathname();
    const scrollY = typeof window !== "undefined" ? document?.documentElement?.scrollTop : 0;

    useEffect(() => {
        close();
    }, [url]);
    return(
        <NavToogle $opened={opened} $scrollY={scrollY}>
            <Logo $toogleNav>
                <LogoIcon href="/">
                    <img src="/logo.svg" alt="YieldFlipper"/>
                    Discount
                </LogoIcon>
            </Logo>
            <div className="hideDesktop" style={{margin: '30px 20px'}}>
                <ConnectWallet fullwidth/>
            </div>
            <Menus>
                <Menu>
                    <MenuItem $active={url === '/'}>
                        <MenuLnik href="/" $active={url === '/'}>
                            <Image src="/navIcons/deals.svg" width={24} height={24} alt="Marketplace"/>
                            Explore Deals
                        </MenuLnik>
                    </MenuItem>
                    <MenuItem $active={url === '/my-earnings'}>
                        <MenuLnik href="/my-earnings" $active={url === '/my-earnings'}>
                            <Image src="/navIcons/earnings.svg" width={24} height={24} alt="Portfolio"/>
                            My Earnings
                        </MenuLnik>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <RawMenuLink href="https://docs.discount.finance/discount/" target="_blank">
                            <img src="/navIcons/faq.svg" alt="Marketplace"/>
                            FAQ
                        </RawMenuLink>
                    </MenuItem>
                </Menu>
            </Menus>
        </NavToogle>
    )
}
export default NavbarToogle;