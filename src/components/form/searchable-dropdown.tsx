import OptionType from "@/types/option-type";
import { ucFirst } from "@/utils/helper-support";
import { Search } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

type onChangeInputFunc = (e: React.ChangeEvent<HTMLInputElement>) => void

const SearchableDropdown = ({
    options,
    onSelectedOption,
    placeholder,
    label = 'Search',
    labelClass,
    value,
    error,
    disabled = false,
    onChangeInput,
    inputClass,
}: {
    options?: OptionType[],
    placeholder?: string,
    label?: string,
    labelClass?: string,
    value?: string,
    error?: string | null,
    disabled?: boolean,
    onChangeInput?: onChangeInputFunc,
    onSelectedOption?: (value: string) => void,
    inputClass?: string,
}) => {

    const [showMOptions, setShowMOptions] = useState<boolean>(false);

    const showMOptionsRef = useRef<HTMLDivElement>(null);

    const [getPlaceholder, setGetPlaceholder] = useState<string>(placeholder ?? `Select ${label}`);

    const [getValue, setGetValue] = useState<string>(value ?? '');

    const [initialState, setToggle] = useState<boolean>(true);

    useEffect(() => { setGetValue(value ?? ''); setGetPlaceholder(value ?? placeholder ?? `Select ${label}`) }, [value, placeholder, label])

    useEffect(() => {
        if (options && options.length == 0) {
            if (onSelectedOption) {
                onSelectedOption('nil');
            }
            return;
        }
        if (!initialState) {
            setShowMOptions(true);
        }
        
        if (value && onSelectedOption) {
            onSelectedOption(options?.find((option) => option.name === value)?.value ?? 'nil');
        }
        setToggle(true);
    }, [options, onSelectedOption])


    const onShowOption = useCallback((triggerBy = 'default') => {
        if (triggerBy === 'outsideEvent') {
            setShowMOptions(false);
        } else {
            setShowMOptions(prevShowMOptions => !prevShowMOptions);
        }
    }, []); // showMOptions is managed by setShowMOptions, so it's not a direct dependency here if using functional update

    const handleOnClickOutside = useCallback((event: MouseEvent | Event) => {
        if (showMOptionsRef.current && !showMOptionsRef.current.contains(event.target as Node)) {
            onShowOption('outsideEvent');
        }
    }, [onShowOption]);

    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('click', handleOnClickOutside);
        document.addEventListener('input', handleOnClickOutside);

        // Cleanup event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOnClickOutside);
        };
    }, [handleOnClickOutside]);

    const onSelectOption = (item: OptionType | null) => {
        if (!item) {
            setGetPlaceholder(placeholder ?? `Select ${label}`);
            setShowMOptions(false)
            if (onSelectedOption) {
                onSelectedOption('nil');
            }
            setGetValue('');
            return;
        }
        if (onSelectedOption) {
            onSelectedOption(item.value);
        }
        setGetPlaceholder(item.name);
        setGetValue(item.name);
        setShowMOptions(false);
    }

    return (
        <div onClick={(() => setShowMOptions(!showMOptions))} ref={showMOptionsRef} className="relative">
            <p className={`${labelClass} flex items-center space-x-3 label mb-1`}>
                <span>{label}</span>
            </p>
            <div className="relative flex items-center">
                <div className="absolute z-10 left-5">
                    <Search size={18} />
                </div>
                <input
                    placeholder={getPlaceholder}
                    type='search'
                    className={`input border-[#E8ECEF] pl-12 ${inputClass} border ${error && 'border-red-500'} ${disabled && 'text-light-black'}`}
                    onInput={onChangeInput}
                    value={getValue}
                    disabled={disabled}
                    inputMode={'search'}
                />
                {(showMOptions && (options && options.length > 0)) && (
                    <div className="absolute left-0 right-0 w-full themeBg h-[10em] overflow-y-auto z-50 rounded shadow-md border p-2 top-12">
                        <ul className="grid gap-y-2">
                            <li onClick={() => onSelectOption(null)} className="p-1 cursor-pointer themeTextMuted hover:bg-gray-50 dark:hover:bg-gray-700">{`Select ${label}`}</li>
                            {options?.map((option, index) => <li key={index} onClick={() => onSelectOption(option)} className="p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">{ucFirst(option.name)}</li>)}
                        </ul>
                    </div>
                )}
                {/* <input type={'text'} className="absolute top-0 left-0 w-full h-full bg-transparent border-0 cursor-pointer input" readOnly/> */}
            </div>
            {error && <p className="my-1 text-[13px] themeTextError font-[400]">{ucFirst(error)}</p>}
        </div>
    );
}

export default SearchableDropdown