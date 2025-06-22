import { Eye, EyeOff, Search } from "lucide-react";
import { ReactNode, useState } from "react";
import Tooltip from "../tooltip";
import { numberWithCommas, removeCommas, ucFirst } from "@/utils/helper-support";

type onChangeInputFunc = (e:React.ChangeEvent<HTMLInputElement>) => void

type InputTypeLabel = 'text' | 'email' | 'number' | 'password'| 'search' | 'money-format';

type InputModeLabel = 'text' | 'email' | 'numeric' | 'search';

type InputType = {
    placeholder?:string,
    type?: InputTypeLabel,
    label?: string,
    labelClass?: string,
    id?: string,
    value?:string,
    error?:string|null,
    disabled?:boolean,
    onChangeInput?: onChangeInputFunc,
    inputClass?:string,
    icon?: ReactNode,
    leftIcon?: ReactNode,
    toolTip?:string,
}

const InputField = ({
    placeholder,
    type = 'text',
    label,
    labelClass,
    id,
    value,
    error,
    onChangeInput,
    disabled = false,
    inputClass,
    icon,
    leftIcon,
    toolTip,
} : InputType) => {
    const Id = id ?? label;

    const getType = (type:InputTypeLabel)  => {
        if (type === 'money-format' || type === 'number') return 'text';
        return type;
    }

    const getInputMode =(type:InputTypeLabel) : InputModeLabel =>{
        if ( type === 'number') return 'numeric';
        if ( type === 'email') return 'email';
        if ( type === 'search') return 'search';
        return 'text';
    }

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [inputType, setInputType] = useState<InputTypeLabel>(getType(type));

    const [inputMode, setInputMode] = useState<InputModeLabel>(getInputMode(type));

    const onTogglePassword = () => {
        setShowPassword(!showPassword)
        showPassword ? setInputType('password') : setInputType('text');
    }

    const onInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (type === 'money-format') {
            value = removeCommas(value);
            e.target.value = numberWithCommas(value);
        }
        
        if ( type === 'number' && !/^[0-9]*$/.test(value) ) {
            e.target.value = value.slice(0, -1);
            return;
        }
        onChangeInput && onChangeInput(e);
    }

    const formatValue = (value?:string) => {
        if (type === 'money-format') {
            return numberWithCommas(value??'');
        }
        return value;
    }

    return(
        <label htmlFor={Id}>
            <p className={`${labelClass} flex items-center space-x-3 label mb-1`}>
                <span>{label}</span>
                {toolTip && <Tooltip text={toolTip}/>}
            </p>
            <div className="relative flex items-center">
            {(type === 'search') && <div className="absolute z-10 left-5">
                    <Search size={18}/>
                </div>}
                <input
                    placeholder={placeholder ?? `Enter ${label}`}
                    type={ inputType}
                    className={`input  ${(type ==='search') && 'pl-14'} ${(leftIcon) && 'pl-10'} ${inputClass}  ${error && 'border-red-500 border'} ${disabled && 'text-light-black'}`}
                    onInput={onInput}
                    value={formatValue(value)}
                    disabled={disabled}
                    inputMode={inputMode}
                />
                {(type !== 'password' && icon) && <div className="absolute right-5">
                    {icon}
                </div>}
                {leftIcon && <div className="absolute left-5">{leftIcon}</div>}
                {type === 'password' &&
                    <div className="absolute cursor-pointer right-5" onClick={onTogglePassword}>
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </div>
                }

            </div>
            {error && <p className="my-1 text-[13px] themeTextError font-[400]">{ucFirst(error)}</p>}
        </label>
    );
}

export default InputField;
