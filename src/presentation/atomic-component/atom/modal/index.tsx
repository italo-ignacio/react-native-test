/* eslint-disable no-extra-parens */
import { Button } from '../button';
import { Modal as ModalUi, TouchableOpacity, View } from 'react-native';
import type { ButtonProps } from '../button';
import type { DimensionValue, ViewStyle } from 'react-native';
import type { FC, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  button?: Partial<ButtonProps> & { text: string };
  title?: string;
  openModalElement?: ReactNode;
  size?: DimensionValue | 'full' | 'large' | 'medium' | 'small';
  disableBackdrop?: boolean;
  hideBackground?: boolean;
  view?: {
    className?: string;
    style?: ViewStyle;
  };
}

export const getWidth = (
  size?: DimensionValue | 'full' | 'large' | 'medium' | 'small'
): DimensionValue => {
  switch (size) {
    case 'large':
      return '90%';
    case 'medium':
      return '70%';
    case 'small':
      return '50%';
    case 'full':
      return 'auto';
    default:
      if (size) return size;
      return 'auto';
  }
};

export const Modal: FC<ModalProps> = ({ children, openModal, closeModal, view, ...props }) => {
  return (
    <>
      {props.button ? <Button {...props.button} onPress={openModal} /> : props.openModalElement}

      <ModalUi
        animationType={'none'}
        onRequestClose={closeModal}
        transparent
        visible={props.isOpen}
      >
        <TouchableOpacity
          className={'w-full h-full'}
          onPress={closeModal}
          style={{ backgroundColor: props.hideBackground ? '' : '#00000075' }}
        >
          <View className={'flex flex-1 justify-center items-center'}>
            <TouchableOpacity
              activeOpacity={1}
              className={`rounded-lg p-2 bg-white ${view?.className ?? ''}`}
              style={{ width: getWidth(props.size), ...(view?.style ?? {}) }}
            >
              {children}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ModalUi>
    </>
  );
};
