import { useState, Dispatch, SetStateAction } from "react";
import {Input, InputContainer, InputLabel, InputLayout, InputToken} from './TokenInputStyles';
import Image from "next/image";

export default function TokenInput({
    onChange,
} : {
    onChange: Dispatch<SetStateAction<number>>
}){
    const [userQuery, setUserQuery] = useState("");
    const updateAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let {value} = e.target as HTMLInputElement;
        if (/^[0-9]*(\.|,)?[0-9]{0,5}$/.test(value)) {
            setUserQuery(value);
            const numVal = Number(value.replace(',', '.'));
            if(numVal >= 0) onChange(numVal);
        }
    }
    return(
        <InputContainer>
            <InputLabel>How much do you want to spend?</InputLabel>
            <InputLayout>
                <Input type="number" step={0.1} value={userQuery} onInput={updateAmount}/>
                <InputToken>
                    <Image src="/tokens/USDC.svg" width={24} height={24} alt="token"/>
                    USDC
                </InputToken>
            </InputLayout>
        </InputContainer>
    )
}
