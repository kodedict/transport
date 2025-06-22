import { ucFirst } from "@/utils/helper-support";

type onChangeInputFunc = (e:React.ChangeEvent<HTMLTextAreaElement>) => void

type InputType = {
    placeholder?:string,
    label?: string,
    id?: string,
    value?:string,
    error?:string|null,
    onChangeInput?: onChangeInputFunc,
}

const TextareaField = ({
    placeholder,
    label,
    id,
    value,
    error,
    onChangeInput
} : InputType) => {
    const Id = id ?? label;

    return(
        <div className="">
            <span className="label">{label}</span>
            <textarea
                placeholder={placeholder ?? `Enter ${label}`}
                className={`input py-3 mt-1 h-full ${error && 'border-red-500'}`}
                onInput={onChangeInput}
                rows={2} cols={200}
                value={value}
            />
            {error && <p className="my-1 text-[13px] themeTextError font-[400]">{ucFirst(error)}</p>}
        </div>
    );
}

export default TextareaField;
