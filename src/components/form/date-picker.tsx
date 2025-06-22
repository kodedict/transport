import moment from "moment";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Calendar } from "lucide-react";
import { ucFirst } from "@/utils/helper-support";

type onChangeInputFunc = (e:string) => void

type InputType = {
    placeholder?:string,
    label?: string,
    id?: string,
    value?:string,
    error?:string|null,
    disabled?:boolean,
    onChangeInput?: onChangeInputFunc,
    inputClass?:string,
}

const DatePickerField = ({
    placeholder,
    label,
    id,
    value,
    error,
    onChangeInput,
    disabled = false,
    inputClass
} : InputType) => {
    const Id = id ?? label;

    const [date, setDate] = useState(new Date());

    const onChangeDate = (date:any) => {
        setDate(date);
        date = moment(date).format('L');
        onChangeInput && onChangeInput(date);
    }

    const PlaceholderText = placeholder ?? `dd/mm/yyyy`;

    return(
        <label htmlFor={Id} className="label">
            <span>{label}</span>
            <div className={`relative justify-between w-full input ${inputClass} ${error && 'border-red-500'} ${disabled && 'text-light-black'}`}>
                    <span>{value ? moment(value).format('DD/MM/YYYY') : PlaceholderText}</span>                    
                    <div className="ml-5">
                        <Calendar size={16}/>
                    </div>
                    <div className="absolute top-0 left-0 right-0 w-full h-full bg-transparent">
                        <Flatpickr
                        value={date}
                        onChange={(dateValue) => onChangeDate(dateValue[0]??new Date())} 
                        options={{
                        dateFormat: "Y-m-d",
                        enableTime: false, // Set to true if you need time selection,
                        allowInput: true
                        }}
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                    />
                    </div>
                </div>
            {error && <p className="my-1 text-[13px] text-red-500 font-[400]">{ucFirst(error)}</p>}
        </label>
    );
}

export default DatePickerField;