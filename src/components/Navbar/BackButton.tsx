import styled from 'styled-components'
import Image from 'next/image'
import { prevInApp } from '@/helpers/historyManager'
import { useRouter } from 'next/navigation'

const Back = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #EFEFEF;
    background: #FFF;
    backdrop-filter: blur(4px);
`

export default function BackButton(){
    const router = useRouter();
    const backToPrevPage = () => {
        if(prevInApp()) router.back();
        else router.push('/');
    }
    return(
        <Back onClick={() => backToPrevPage()}>
            <Image src="/chevron-left.svg" width={20} height={20} alt='chevron left'/>
        </Back>
    )
}
