
import { useConnectWallet } from '@web3-onboard/react';
import { DefaultButton } from "./NavbarStyles"
import Image from 'next/image';

export default function ConnectWallet({
    background,
    hover,
    fullwidth
} : {
    background?: string,
    hover?: string,
    fullwidth?: boolean
}){
    const [{ wallet }, connect] = useConnectWallet();
    return(
    <DefaultButton className="alignY" style={{gap: '0 10px'}} onClick={() => connect()} $bg={background || "#000"} $bgHover={hover || "#444"} $fullWidth={fullwidth}>
        Connect
        <Image src="/white-wallet.svg" alt="wallet" width={24} height={24}/>
    </DefaultButton>
    )
}