import { useState } from 'react';

export const useModal = (): {
  isOpen: boolean;
  isUpdate: boolean;
  openModal: (isUpdate?: boolean) => void;
  closeModal: () => void;
} => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const openModal = (modalToUpdate?: boolean): void => {
    if (modalToUpdate) setIsUpdate(true);
    else setIsUpdate(false);

    setIsOpen(true);
  };

  const closeModal = (): void => {
    document.body.scrollTop = 0;
    setIsOpen(false);
  };

  return { closeModal, isOpen, isUpdate, openModal };
};
