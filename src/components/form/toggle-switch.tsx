import { ucFirst } from "@/utils/helper-support";
import { Check, LucideIcon, X } from "lucide-react";
import React, {ReactNode, useState} from "react";

type ToggleSwitchType = {
    initialState:boolean,
    onToggle?: (state: boolean) => void | null,
    disableToggle?: boolean,
    disableIcon?: ReactNode,
    activeIcon?: ReactNode,
    label?: string
    error?:string|null,
}
const ToggleSwitch = ({initialState, label, onToggle = () => {}, disableToggle = false, disableIcon, activeIcon, error}:ToggleSwitchType) => {


    const handleToggle = () => {
        if (disableToggle) return;
        const newState = !initialState;
        //setToggle(newState);
        onToggle(newState);
    }

    return (
        <div>
            <div onClick={handleToggle} className="flex items-center space-x-2">
                <div className={`relative grid ${!disableToggle && 'cursor-pointer'} content-center w-11 h-6 p-1 rounded-full ${initialState ? 'bg-primary justify-items-end' : 'bg-gray-300'}`}>
                    <div className="grid p-1 bg-white rounded-full w-fit justify-items-center dark:text-black">
                        {initialState ? activeIcon ?? <Check size={10} />  : disableIcon ?? <X size={10}/>}
                    </div>
                </div>
                {label && <span className="text-sm">{label}</span>}
            </div>
            {error && <span className="my-1 text-[13px] text-red-500 capitalize label font-[400]">{ucFirst(error)}</span>}
        </div>
    );
}

export default ToggleSwitch
