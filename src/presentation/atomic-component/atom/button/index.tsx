/* eslint-disable no-extra-parens */
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from 'presentation/style';
import type { BaseSyntheticEvent, FC, ReactNode } from 'react';
import type { IconNames } from 'domain/protocol';
import type { TouchableOpacityProps } from 'react-native';

export interface ButtonProps {
  text: string;
  variant?: 'default' | 'delete' | 'outlined' | 'secondary';
  isLoading?: boolean;
  buttonProps?: TouchableOpacityProps;
  size?: 'normal' | 'small';
  leftIcon?: IconNames;
  onPress?: (e?: BaseSyntheticEvent) => Promise<void> | void;
  leftComponent?: ReactNode;
  rightIcon?: IconNames;
  rightComponent?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  text,
  variant = 'default',
  leftIcon,
  isLoading,
  size,
  onPress,
  rightIcon,
  leftComponent,
  rightComponent,
  buttonProps
}) => {
  let buttonColor = colors.white;
  let buttonTextColor = colors.success;

  switch (variant) {
    case 'default':
      buttonColor = colors.primary;
      buttonTextColor = colors.white;
      break;
    case 'delete':
      buttonColor = colors.red;
      buttonTextColor = colors.white;
      break;
    case 'outlined':
      buttonColor = colors.transparent;
      buttonTextColor = colors.primary;
      break;
    default:
      buttonColor = colors.transparent;
      buttonTextColor = colors.primary;
  }

  return (
    <TouchableOpacity
      {...buttonProps}
      activeOpacity={0.7}
      className={`flex flex-row items-center justify-center rounded-full ${
        buttonProps?.className
      } ${size === 'small' ? 'p-1' : 'p-2'} ${
        variant === 'secondary' || variant === 'outlined' ? 'border border-primary' : ''
      } px-5`}
      disabled={isLoading}
      onPress={onPress}
      style={[{ backgroundColor: buttonColor, ...((buttonProps?.style as object) ?? {}) }]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} size={size === 'small' ? 20 : 24} />
      ) : (
        <>
          {leftIcon ? (
            <MaterialIcons
              color={buttonTextColor}
              name={leftIcon}
              size={size === 'small' ? 16 : 18}
            />
          ) : null}

          {leftComponent ?? null}

          <Text
            className={`capitalize ${size === 'small' ? '' : 'text-base'}`}
            style={[{ color: buttonTextColor }]}
          >
            {text}
          </Text>

          {rightIcon ? (
            <MaterialIcons
              color={buttonTextColor}
              name={rightIcon}
              size={size === 'small' ? 16 : 18}
            />
          ) : null}

          {rightComponent ?? null}
        </>
      )}
    </TouchableOpacity>
  );
};
