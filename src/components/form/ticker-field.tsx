import { ucFirst } from "@/utils/helper-support";
import React, { ReactNode } from "react";

type InputType = {
    label?: string | ReactNode,
    id?: string,
    value?:string,
    error?:string|null,
    name?: string,
    checked?:boolean,
    type?: 'radio' | 'checkbox',
    onChangeInput?: (state: boolean) => void | null,
}

const TickerField = ({
    label,
    id,
    value,
    error,
    name,
    checked = false,
    onChangeInput,
    type = 'checkbox',
} : InputType) => {
    const Id = `${id ?? value}_${type}`;

    const handleToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChangeInput && onChangeInput(e.target.checked);
    }

    return(
        <label htmlFor={Id} className="flex items-center space-x-2 cursor-pointer label w-fit">
            <input 
                name={name ?? Id}
                type={type}
                onChange={handleToggle}
                value={value}
                checked={checked}
                className="w-[20px] h-[20px]"
                id={Id}
            />
            <span>{label}</span>
            {error && <span className="my-1 text-[13px] text-red-500 capitalize label font-[400]">{ucFirst(error)}</span>}
        </label>
    );
}

export default TickerField;