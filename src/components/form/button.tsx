import SpinnerLoader from "../loader/spinner-loader"

type ButtonProps = {
    design?: 'primary' | 'secondary' | 'primary-outline' | 'primary-danger-outline' | '',
    text?:string,
    type?: 'button' | 'submit',
    className?: string,
    onClick?: () => void,
    isLoading?: boolean,
    disabled?: boolean
}

const Button = ({
    design = 'primary',
    text = 'Button text',
    type = 'button',
    className,
    onClick,
    isLoading,
    disabled,
} : ButtonProps) => {
    const getDesign = () => {
        switch (design) {
            case 'primary':
                return 'pryBtn'
            case 'secondary':
                return ''
            case 'primary-outline':
                return 'pryBtnOutline'
            case 'primary-danger-outline':
                return 'pryBtnOutline text-red-700 border-red-700 hover:bg-red-700 hover:text-white'
            default:
                return ''
        }
    }
    return (
        <button onClick={onClick} type={type} className={`${getDesign()} ${className} flex space-x-2 items-center w-fit ${(isLoading||disabled) && 'bg-gray-200 text-gray-400'}`} disabled={isLoading||disabled}>
            <span>{text}</span>
            {isLoading && <SpinnerLoader/>}
        </button>
    )
}

export default Button