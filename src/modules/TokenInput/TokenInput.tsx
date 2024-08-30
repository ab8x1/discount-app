import { useState } from "react";
import {Input, InputContainer, InputLabel, InputLayout, InputToken, TokenBlanceButton, TokenBlance} from './TokenInputStyles';
import Image from "next/image";

export default function TokenInput({
    onChange,
    amount,
    defaultValue,
    action,
    token,
    tokenImgUrl,
    userTokenBalance
} : {
    onChange: (amount: number) => void,
    amount: number,
    defaultValue: number,
    action: () => void,
    token: string,
    tokenImgUrl: string,
    userTokenBalance: number | null
}){
    const [userQuery, setUserQuery] = useState(defaultValue ? defaultValue.toString() : "");
    const amountExceeded = userTokenBalance ? Number(userQuery) > userTokenBalance : false;

    const updateAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let {value} = e.target as HTMLInputElement;
        if (/^[0-9]*(\.|,)?[0-9]{0,5}$/.test(value)) {
            setUserQuery(value.replace(',', '.'));
            const numVal = Number(value.replace(',', '.'));
            if(numVal >= 0 && numVal !== amount) {
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
        if(userTokenBalance && userTokenBalance !== amount){
            setUserQuery(userTokenBalance.toString().replace(',', '.'));
            onChange(userTokenBalance);
        }
    }

    return(
        <InputContainer>
            <InputLabel>
                I want to spend
            {
                amountExceeded &&
                <TokenBlance $exceeded={true}>
                    (Insufficient balance)
                </TokenBlance>
            }
            </InputLabel>
            <InputLayout>
                <Input
                    type="number"
                    step="0.01"
                    lang="en"
                    value={userQuery}
                    onInput={updateAmount}
                    onKeyDown={keyDownListener}
                    $exceeded={amountExceeded}
                />
                <InputToken>
                    <Image src={tokenImgUrl} width={24} height={24} alt="token"/>
                    {token}
                </InputToken>
            </InputLayout>
            <TokenBlanceButton onClick={userTokenBalance ? setMaxBalance : undefined}>My Balance: {userTokenBalance}</TokenBlanceButton>
        </InputContainer>
    )
}
