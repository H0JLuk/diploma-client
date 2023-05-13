import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { modalContainerId } from '@/pages/_document';

import { Button } from '../Button/Button';

export type ModalProps = PropsWithChildren<{
  isOpened: boolean;
  isLoading?: boolean;
  acceptBtnText: string;
  declineBtnText: string;
  titleText: string;
  formId?: string;
  onSubmit?(): void;
  onClose(): void;
}>;

export const Modal: FC<ModalProps> = ({
  isOpened,
  isLoading,
  acceptBtnText,
  declineBtnText,
  titleText,
  formId,
  onClose,
  onSubmit,
  children,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isOpened) {
      window.document.body.style.overflow = 'hidden'; // TODO: вынести в класс
    } else {
      window.document.body.style.overflow = 'auto';
    }
    return () => {
      window.document.body.style.overflow = 'auto';
    };
  }, [isOpened]);

  const modalContent = (
    <div
      className={`${
        isOpened ? '' : 'opacity-0 pointer-events-none'
      } transition-all flex items-center justify-center fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full backdrop-blur-sm bg-black bg-opacity-50`}
    >
      {/* Modal content */}
      <div className='relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow'>
        {/* Modal header */}
        <div className='flex items-start justify-between p-4 border-b rounded-t'>
          <h3 className='text-xl font-semibold text-gray-900'>{titleText}</h3>
          <Button onClick={onClose} variant='clear'>
            &#x2715;
          </Button>
        </div>
        {/* Modal body */}
        <div className='p-6'>{children}</div>
        {/* Modal footer */}
        <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b'>
          <Button form={formId} type={formId ? 'submit' : 'button'} onClick={onSubmit} isLoading={isLoading}>
            {acceptBtnText}
          </Button>
          <Button onClick={onClose} variant='outlined'>
            {declineBtnText}
          </Button>
        </div>
      </div>
    </div>
  );

  if (isBrowser) {
    const containerElement = document.getElementById(modalContainerId);
    if (containerElement) return createPortal(modalContent, containerElement);
  }
  return null;
};
