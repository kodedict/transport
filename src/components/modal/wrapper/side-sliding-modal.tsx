import { CircleX } from 'lucide-react';
import React, {useState, useEffect, ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode;
    buttonTrigger: ReactNode;
    slideTitle?:string
    forceModalClose?: null | boolean;
    onSetForceModalClose?: (state:any) => void,
    open?: boolean,
    onClose?: () => void
}

const SideSlidingModal = ({children, open = false, buttonTrigger, slideTitle, onClose}: LayoutProps) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOpen = (isOpen:boolean) => {
        if (isOpen) {
        document.body.style.overflow = 'hidden';
        setIsAnimating(true);
        } else {
            setIsAnimating(false);
            document.body.style.overflow = 'auto';
        }

        return () => {
        document.body.style.overflow = 'auto';
        };
    }

    useEffect(() => {
        setOpenModal(open)
    }, [open]);

     useEffect(() => {
        handleOpen(openModal);
    }, [openModal]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setOpenModal(false)
            onClose && onClose();
            document.body.style.overflow = 'auto';
        }, 300);
    };

    return (
        <div className='relative'>
            <div onClick={() => setOpenModal(true)}>
                {buttonTrigger} 
            </div>
            
             <div id='modal' className={`${isAnimating ? 'translate-x-0' : 'translate-x-full' } bg-[#F8F8F8] p-10  fixed transition-transform duration-500 transform right-0 lg:w-[45%] w-full top-0 h-full z-40 overflow-y-auto`}>
                <div className='flex items-center mb-5'>
                    <h3 className='text-[1.4em] font-semibold break-words md:text-2xl'>{slideTitle ?? 'Slide Title'}</h3>
                    <button type='button' onClick={() => handleClose()} className={`fixed z-50 opacity-100 right-8 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
                        <CircleX size={25}/>
                    </button>
                </div>
                {children}
            </div>
            {(openModal ) && <div onClick={() =>  handleClose()} className='fixed inset-0 top-0 left-0 z-30 w-full h-full py-10 bg-[rgba(0,0,0,0.5)]'></div>}
        </div>
    );
};

export default SideSlidingModal