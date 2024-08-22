import { MaterialIcons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import type { FC } from 'react';
import type { GestureResponderEvent, StyleProp, TextInputProps, ViewStyle } from 'react-native';
import type { IconNames } from 'domain/protocol';

export type LabelInputProps = TextInputProps & {
  isRequired?: boolean;
  label?: string;
  error?: string;
  leftIcon?: {
    name: IconNames;
    style?: StyleProp<ViewStyle>;
    color?: string;
    onPress?: ((() => void) & ((event: GestureResponderEvent) => void)) | undefined;
  };
  rightIcon?: {
    name: IconNames;
    style?: StyleProp<ViewStyle>;
    color?: string;
    onPress?: ((() => void) & ((event: GestureResponderEvent) => void)) | undefined;
  };
};

export const LabelInput: FC<LabelInputProps> = ({
  label,
  rightIcon,
  isRequired,
  error,
  leftIcon,
  ...rest
}) => {
  const maxWidth = (): number => {
    let value = 0;

    if (rightIcon) value += 7;
    if (leftIcon) value += 7;

    const final = 100 - value;

    return final;
  };

  return (
    <View {...gap(5)}>
      {label ? (
        <Text className={'text-gray-700 text-sm'}>
          {label}
          {isRequired ? ' *' : ''}
        </Text>
      ) : null}

      <View
        className={'flex flex-row border p-1.5 px-3 items-center rounded-md'}
        style={{
          backgroundColor: colors.white,
          borderColor: error ? colors.red : colors.inputBorder,
          gap: 6
        }}
      >
        {leftIcon ? (
          <TouchableOpacity activeOpacity={0.8} onPress={leftIcon?.onPress} style={leftIcon?.style}>
            <MaterialIcons
              color={error ? colors.red : leftIcon?.color ?? colors.gray[300]}
              name={leftIcon.name}
              size={18}
            />
          </TouchableOpacity>
        ) : null}

        <TextInput
          className={'w-full'}
          {...rest}
          placeholderTextColor={colors.placeholder}
          style={{ maxWidth: `${maxWidth()}%` }}
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
              size={18}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
