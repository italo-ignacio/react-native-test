/* eslint-disable no-extra-parens */
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from 'presentation/style';
import type { BaseSyntheticEvent, FC, ReactNode } from 'react';
import type { IconNames } from 'domain/protocol';
import type { TouchableOpacityProps } from 'react-native';

interface ButtonProps {
  text: string;
  variant?: 'default' | 'delete' | 'secondary';
  isLoading?: boolean;
  buttonProps?: TouchableOpacityProps;
  leftIcon?: IconNames;
  onPress: (e?: BaseSyntheticEvent) => Promise<void> | void;
  leftComponent?: ReactNode;
  rightIcon?: IconNames;
  rightComponent?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  text,
  variant = 'default',
  leftIcon,
  isLoading,
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
    default:
      buttonColor = colors.white;
      buttonTextColor = colors.secondary;
  }

  return (
    <TouchableOpacity
      {...buttonProps}
      activeOpacity={0.7}
      className={`flex flex-row items-center justify-center rounded-md p-2 ${buttonProps?.className}`}
      disabled={isLoading}
      onPress={onPress}
      style={[{ backgroundColor: buttonColor, ...(buttonProps ?? {}) }]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} size={24} />
      ) : (
        <>
          {leftIcon ? <MaterialIcons color={buttonTextColor} name={leftIcon} size={18} /> : null}
          {leftComponent ?? null}

          <Text className={'capitalize text-base'} style={[{ color: buttonTextColor }]}>
            {text}
          </Text>

          {rightIcon ? <MaterialIcons color={buttonTextColor} name={rightIcon} size={18} /> : null}
          {rightComponent ?? null}
        </>
      )}
    </TouchableOpacity>
  );
};
