import Image from "next/image";
import { Chevron, Chain, ChainSelectorList, ChainSelectorContainer, SelectedChain } from "./ChainSelectorStyles";
import { useState, useRef, useEffect } from "react";
import UseClickOutside from "@/hooks/useClickOutside";
import { useSetChain } from "@web3-onboard/react";
import useUser from "@/hooks/useUser";

type Chain = {
    name: string;
    icon: string;
    id: string;
}

export const chains: Chain[] = [
    {
        name: "Mainnet",
        icon: "/chains/Mainnet.svg",
        id: "0x1"
    },
    {
        name: "Arbitrum",
        icon: "/chains/Arbitrum.svg",
        id: "0xa4b1"
    }
]

export default function ChainSelector(){
    const [selectedChain, setSelectedChain] = useState(chains[0]);
    const [isOpen, setIsOpen] = useState(false);
    const user = useUser();
    const [{ connectedChain }, setChain] = useSetChain();
    const ref = useRef<HTMLDivElement>(null);
    UseClickOutside(ref, () => setIsOpen(false));

    useEffect(() => {
        if(connectedChain?.id !== selectedChain.id){
            const supportedChain = chains.find(chain => chain.id === connectedChain?.id);
            if (supportedChain) {
                setSelectedChain(supportedChain);
            }
            else{
                setSelectedChain(chains[0]);
            }
        }
    }, [connectedChain?.id]);

    const toogleList = async () => {
        if (chains.some(chain => chain.id === connectedChain?.id)) {
            setIsOpen(!isOpen);
        } else {
            await setChain({ chainId: selectedChain.id });
        }
    }

    const handleChainClick = async (chain: Chain) => {
        const result = await setChain({chainId: chain.id});
        if(result){
            setSelectedChain(chain);
            setIsOpen(false);
        }
    }

    return(
        <>
            {
                user &&
                <ChainSelectorContainer ref={ref}>
                    <SelectedChain onClick={toogleList}>
                        <Image src={selectedChain.icon} alt={selectedChain.name} width={20} height={20}/>
                        <span>{selectedChain.name}</span>
                        <Chevron src="/chevron-left.svg" alt="chevron" width={20} height={20} $isOpen={isOpen}/>
                    </SelectedChain>
                    <ChainSelectorList $isOpen={isOpen}>
                        {chains.filter(chain => chain.id !== selectedChain.id).map((chain) => (
                            <Chain key={chain.id} onClick={() => handleChainClick(chain)}>
                                <Image src={chain.icon} alt={chain.name} width={20} height={20}/>
                                <span>{chain.name}</span>
                            </Chain>
                        ))}
                    </ChainSelectorList>
                </ChainSelectorContainer>
            }
        </>
    )
}
