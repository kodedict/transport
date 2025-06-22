import React, { ReactNode, useState } from "react";
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import SpinnerLoader from "../loader/spinner-loader";
import Button from "../form/button";


type DefaultModalType = {
    icon?: any,
    description?:string,
    modalButtonTrigger?: ReactNode,
    modalButtonConfirmationText?: string,
    modalButtonCancelText?: string,
    onConfirmationAction?: (args?: any) => void,
    buttonTriggerClass?: string,
    buttonTriggerClassIcon?: any,
    onButtonTriggerClick?: () => void,
    args?: any,
    open?: boolean,
}

const DefaultModal = ({
    icon,
    description = 'What do you want to do?',
    modalButtonTrigger,
    modalButtonConfirmationText = 'Yes',
    modalButtonCancelText = 'No',
    onConfirmationAction,
    args,
    open,
}:DefaultModalType) => {
    const [loading, setLoading] = useState<boolean>(false);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const processAction = async () => {
      setLoading(true); 
        onConfirmationAction && await onConfirmationAction(args);
        setLoading(false);
        setOpenModal(false);
    }

  const ModalContent = () => (
    <div>
        <div className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
          <div className="relative w-full max-w-lg max-h-full p-4">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-4 text-center md:p-5">
                <div className="flex justify-center w-full">
                  {icon}
                </div>
                <h3 className="my-5 mb-5 text-lg font-normal themeTextSecondary">
                  {description}
                </h3>
                <div className="flex justify-center space-x-2">
                    <Button isLoading={loading} design="primary" className="px-8" text={modalButtonConfirmationText} onClick={() => processAction()}/>
                    <Button disabled={loading} design="primary-outline" className="px-8" text={modalButtonCancelText} onClick={() => setOpenModal(false)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`fixed inset-0 z-40 bg-gray-900/50`}></div>
    </div>
  )

    return(
        <>
          <span onClick={() => setOpenModal(true)} className="cursor-pointer">
              {modalButtonTrigger ?? 'open modal'}
          </span>
          {openModal && createPortal(<ModalContent/>, document.body)}
        </>
    );
}

export default DefaultModal