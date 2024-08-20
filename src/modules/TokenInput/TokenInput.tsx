import { useState } from "react";
import {Input, InputContainer, InputLabel, InputLayout, InputToken, TokenBlance} from './TokenInputStyles';
import Image from "next/image";

export default function TokenInput({
    onChange,
    defaultValue,
    action,
    token,
    userTokenBalance
} : {
    onChange: (amount: number) => void,
    defaultValue: number,
    action: () => void,
    token: string,
    userTokenBalance: number | null
}){
    const [userQuery, setUserQuery] = useState(defaultValue ? defaultValue.toString() : "");

    const updateAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let {value} = e.target as HTMLInputElement;
        if (/^[0-9]*(\.|,)?[0-9]{0,5}$/.test(value)) {
            setUserQuery(value.replace(',', '.'));
            const numVal = Number(value.replace(',', '.'));
            if(numVal >= 0) {
                onChange(numVal)
            };
        }
    }

    const keyDownListener = (e: React.KeyboardEvent<HTMLInputElement>):void => {
        if(e.key === "Enter"){
            if(window.innerWidth >= 768){
                action();
            }
            else{
                (document?.activeElement as HTMLElement)?.blur();
            }
        }
    }

    const setMaxBalance = () => {
        if(userTokenBalance){
            setUserQuery(userTokenBalance.toString().replace(',', '.'));
            onChange(userTokenBalance);
        }
    }

    return(
        <InputContainer>
            <InputLabel>I want to spend</InputLabel>
            <InputLayout $exceeded={userTokenBalance ? Number(userQuery) > userTokenBalance : false}>
                <Input
                    type="number"
                    step="0.01"
                    lang="en"
                    value={userQuery}
                    onInput={updateAmount}
                    onKeyDown={keyDownListener}
                />
                <InputToken>
                    <Image src={`/tokens/${token}.svg`} width={24} height={24} alt="token"/>
                    {token}
                </InputToken>
            </InputLayout>
            <TokenBlance onClick={userTokenBalance ? setMaxBalance : undefined} $exceeded={userTokenBalance ? Number(userQuery) > userTokenBalance : false}>MAX: {userTokenBalance}</TokenBlance>
        </InputContainer>
    )
}
