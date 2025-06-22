import { ucFirst } from '@/utils/helper-support';
import { useState, useRef, ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';

type OtpInputType = {
    length?: number,
    onFilled?: (otp:string) => void,
    hidden?: boolean,
    onInput?:(otp:string) => void,
    error?:string|null,
}

const NumericInput = ({
    length = 4,
    onFilled,
    hidden = false,
    onInput,
    error,
} : OtpInputType) => {
    const [inputBox, seInputBox] = useState(new Array(length).fill(''));

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>, index:number) => {
        const { value } = e.target;
        if (/[^0-9]/.test(value)) {
            e.target.value = '';
            return;
        }
        const groupInput = [...inputBox];

        groupInput[index] = value;

        seInputBox(groupInput);

        if (value && index < length - 1 && inputRefs.current) {
            inputRefs.current[index + 1]?.focus();
        }

        const otp = groupInput.join('');

        handleFilled(otp);
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);

        const groupInput = pastedData.split('').slice(0, length);

        seInputBox(groupInput);

        groupInput.forEach((value, i) => {
            const inputRef = inputRefs.current[i];
            if (inputRef) {
                inputRef.value = value;
                inputRef.focus();
            }
        });

        const otp = groupInput.join('');

        handleFilled(otp);
    };

    const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index:number) => {
        if ( e.key !== 'Backspace' ) return;

        const groupInput = [...inputBox];

        if (inputBox[index]) {
            groupInput[index] = '';
        } else if (index > 0) {
            groupInput[index - 1] = '';
            inputRefs.current[index - 1]?.focus();
        }

        seInputBox(groupInput);
        onInput && onInput(groupInput.join(''));
    }

    const handleFilled = (otp:string) => {
        onInput && onInput(otp);
        if ( otp.length === length ){
            inputRefs.current[inputRefs.current.length - 1]?.blur();
            onFilled && onFilled(otp);
        }
    }

    return (
        <div>
            <div className='flex space-x-2'>
            {inputBox.map((_, index) => (
                <input
                    key={index}
                    maxLength={1}
                    type={hidden ? 'password' : 'text'}
                    className='px-0 text-center input h-[3.5em] border'
                    onChange={(e) => handleInput(e, index)}
                    value={inputBox[index]}
                    onPaste={handlePaste}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    inputMode='numeric'
                />
            ))}
        </div>
            {error && <p className="my-1 text-[13px] themeTextError font-[400]">{ucFirst(error)}</p>}
        </div>
    );
}

export default NumericInput;
