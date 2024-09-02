import { MaterialIcons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import type {
  DimensionValue,
  GestureResponderEvent,
  StyleProp,
  TextInputProps,
  ViewStyle
} from 'react-native';
import type { FC } from 'react';
import type { IconNames } from 'domain/protocol';

export type LabelInputProps = TextInputProps & {
  isRequired?: boolean;
  label?: string;
  error?: string;
  maxWidth?: DimensionValue;
  leftIcon?: {
    name: IconNames;
    style?: StyleProp<ViewStyle>;
    color?: string;
    onPress?: ((() => void) & ((event: GestureResponderEvent) => void)) | undefined;
    size?: number;
  };
  rightIcon?: {
    name: IconNames;
    style?: StyleProp<ViewStyle>;
    color?: string;
    onPress?: ((() => void) & ((event: GestureResponderEvent) => void)) | undefined;
    size?: number;
  };
};

export const LabelInput: FC<LabelInputProps> = ({
  label,
  rightIcon,
  isRequired,
  error,
  maxWidth,
  leftIcon,
  ...rest
}) => {
  const getMaxWidth = (): number => {
    let value = 0;

    if (rightIcon) value += 7;
    if (leftIcon) value += 7;

    const final = 100 - value;

    return final;
  };

  return (
    <View {...gap(5)}>
      {label ? (
        <Text className={'text-primary text-sm'}>
          {label}
          {isRequired ? ' *' : ''}
        </Text>
      ) : null}

      <View
        className={'flex flex-row border p-1.5 px-3 items-center rounded-md'}
        style={{
          backgroundColor: colors.white,
          borderColor: error ? colors.red : colors.inputBorder,
          gap: 6,
          maxWidth
        }}
      >
        {leftIcon ? (
          <TouchableOpacity activeOpacity={0.8} onPress={leftIcon?.onPress} style={leftIcon?.style}>
            <MaterialIcons
              color={error ? colors.red : leftIcon?.color ?? colors.gray[300]}
              name={leftIcon.name}
              size={leftIcon.size ?? 18}
            />
          </TouchableOpacity>
        ) : null}

        <TextInput
          className={'w-full'}
          placeholderTextColor={colors.placeholder}
          style={{ maxWidth: `${getMaxWidth()}%` }}
          {...rest}
        />

        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={rightIcon?.onPress}
            style={rightIcon?.style}
          >
            <MaterialIcons
              color={error ? colors.red : rightIcon?.color ?? colors.gray[300]}
              name={rightIcon.name}
              size={rightIcon.size ?? 18}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
