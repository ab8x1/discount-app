import { useState, Dispatch, SetStateAction } from "react";
import {Input, InputContainer, InputLabel, InputLayout, InputToken} from './TokenInputStyles';
import Image from "next/image";

export default function TokenInput({
    onChange,
    defaultValue,
    action

} : {
    onChange: Dispatch<SetStateAction<number>>,
    defaultValue: number,
    action: () => void
}){
    const [userQuery, setUserQuery] = useState(defaultValue ? defaultValue.toString() : "");

    const updateAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let {value} = e.target as HTMLInputElement;
        if (/^[0-9]*(\.|,)?[0-9]{0,5}$/.test(value)) {
            setUserQuery(value);
            const numVal = Number(value.replace(',', '.'));
            if(numVal >= 0) onChange(numVal);
        }
    }

    const keyDownListener = (e: React.KeyboardEvent<HTMLInputElement>):void => {
        if(e.key === "Enter" && window.innerWidth >= 768){
            action()
        }
    }

    return(
        <InputContainer>
            <InputLabel>I want to spend</InputLabel>
            <InputLayout>
                <Input
                    type="number"
                    step={0.1}
                    value={userQuery}
                    onInput={updateAmount}
                    onKeyDown={keyDownListener}
                />
                <InputToken>
                    <Image src="/tokens/USDC.svg" width={24} height={24} alt="token"/>
                    USDC
                </InputToken>
            </InputLayout>
        </InputContainer>
    )
}
