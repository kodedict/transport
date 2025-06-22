import { ucFirst } from "@/utils/helper-support";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type onChangeInputFunc = (e:string) => void

type OptionType = {
    name: string,
    value: string,
}

type InputType = {
    placeholder?:any,
    label?: string,
    labelClass?: string,
    id?: string,
    value?:string,
    error?:string|null,
    disabled?:boolean,
    onChangeInput?: onChangeInputFunc,
    inputClass?:string,
    options?: OptionType[],
}

const SelectField = ({
    placeholder,
    label = '',
    labelClass,
    id,
    value,
    error,
    onChangeInput,
    disabled = false,
    inputClass,
    options
} : InputType) => {
    const Id = id ?? label;

    const [showMOptions, setShowMOptions] = useState<boolean>(false);

    const showMOptionsRef = useRef<HTMLLabelElement>(null);

    const getPlaceholder = () => {
        if ( value ){
            const option = options?.find((option) => option.value === value);
            return option?.name ?? '';
        }
        return placeholder ?? `Select ${label}`;
    }

    const onShowOption = (triggerBy = 'default') => {
        triggerBy === 'outsideEvent'  ? setShowMOptions(false) : setShowMOptions(!showMOptions)
    };

    const handleOnClickOutside = (event: MouseEvent) => {
        if (showMOptionsRef.current && ! showMOptionsRef.current.contains(event.target as Node))  onShowOption('outsideEvent');
    }

    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('click', handleOnClickOutside);

        // Cleanup event listener when the component unmounts
        return () => {
        document.removeEventListener('mousedown', handleOnClickOutside);
        };
      });

      const onSelectOption = (value:string) => {
        onChangeInput && onChangeInput(value);
        setShowMOptions(false);
      }

    return(
        <label onClick={(() => setShowMOptions(!showMOptions))} ref={showMOptionsRef} htmlFor={Id} className="relative">
            <p className={`${labelClass} label`}>{label}</p>
            <div className={`relative  mt-1 input border-[#E8ECEF] ${inputClass} border ${error && 'border-red-500'} ${disabled && 'text-light-black'}  justify-between bg-white dark:bg-gray-900`}>
                <span className={`${!value&& 'themeTextMuted'}`}>{ucFirst(getPlaceholder())}</span>
                <span>
                <ChevronDown size={18}/>
                </span>
                {showMOptions && (
                    <div className="absolute left-0 right-0 w-full themeBg h-[10em] overflow-y-auto z-50 rounded shadow-md border p-2 top-0">
                    <ul className="grid gap-y-2">
                        <li onClick={() => onSelectOption('')} className="p-1 cursor-pointer themeTextMuted hover:bg-gray-50 dark:hover:bg-gray-700">{placeholder ?? `Select ${label}`}</li>
                        {options?.map((option, index) => <li key={index} onClick={() => onSelectOption(option.value)} className="p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">{ucFirst(option.name)}</li>)}
                    </ul>
                </div>
                )}
                <input type={'text'} className="absolute top-0 left-0 w-full h-full bg-transparent border-0 cursor-pointer input" readOnly/>
            </div>
            {error && <p className="my-1 text-[13px] themeTextError font-[400]">{ucFirst(error)}</p>}

        </label>
    );
}

export default SelectField;
