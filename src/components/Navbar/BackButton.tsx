"use client"
import styled from 'styled-components'
import Image from 'next/image'
import { prevInApp } from '@/helpers/historyManager'
import { useRouter, useSearchParams } from 'next/navigation'

const Back = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    background: transparent;
    gap: 10px;
`

const BackChevron = styled(Image)`
    border-radius: 50%;
    border: 1px solid #EFEFEF;
    background: #FFF;
    backdrop-filter: blur(4px);
    overflow: hidden;
    padding: 7px;
`

export default function BackButton(){
    const router = useRouter();
    const params = useSearchParams();
    const returnToEarnings = params.get('returnToEarnings');

    const backToPrevPage = () => {
        if(returnToEarnings){
            router.push(`/my-earnings?page=${returnToEarnings}`);
        }
        else if(prevInApp()){
            router.back();
        }
        else{
            router.push('/');
        }
    }
    return(
        <Back onClick={() => backToPrevPage()}>
            <BackChevron src="/chevron-left.svg" width={40} height={40} alt='chevron left'/>
            {returnToEarnings && "Portfolio"}
        </Back>
    )
}
