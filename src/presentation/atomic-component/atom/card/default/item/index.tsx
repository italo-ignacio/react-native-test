/* eslint-disable no-extra-parens */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
import { LabelInput } from 'presentation/atomic-component/atom/label-input';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { colors } from 'presentation/style';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface ItemDefaultCardProps {
  rightElement?: ReactNode;
  title: string;
  subtitle: ReactNode | string;
  isEdit?: {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    setEdit: Dispatch<SetStateAction<boolean>>;
    edit: boolean;
    isRequired?: boolean;
  };
  leftElement?: ReactNode;
  isLast?: boolean;
}

export const ItemDefaultCard: FC<ItemDefaultCardProps> = ({
  subtitle,
  title,
  isLast,
  isEdit,
  leftElement,
  rightElement
}) => {
  const getWidth = (): number => {
    let value = 0;

    if (rightElement || isEdit) value += 13;
    if (leftElement) value += 13;

    const final = 100 - value;

    return final;
  };

  const getSubtitle = (): ReactNode => {
    if (isEdit?.edit)
      return (
        <LabelInput
          onChangeText={(value): void => {
            isEdit.setValue(value);
          }}
          value={isEdit.value}
        />
      );

    if (typeof subtitle === 'string')
      return <Text className={'text-primary text-base font-medium'}>{subtitle}</Text>;

    return subtitle;
  };

  return (
    <View className={`flex flex-row items-center px-3 w-full ${isLast ? 'py-2' : 'pt-2'}`}>
      {leftElement ? (
        <View className={''} style={{ width: 40 }}>
          {leftElement}
        </View>
      ) : null}

      <View style={{ width: `${getWidth()}%` }}>
        <Text className={`text-primary text-sm ${isEdit?.edit ? 'mb-2' : ''}`}>{title}</Text>
        {getSubtitle()}
      </View>

      {isEdit ? (
        <View className={'items-end'} style={{ width: 40 }}>
          {isEdit.edit ? (
            <MaterialIcons
              color={colors.primary}
              name={'cancel'}
              onPress={(): void => isEdit.setEdit(false)}
              size={24}
            />
          ) : (
            <MaterialIcons
              color={colors.primary}
              name={'edit'}
              onPress={(): void => {
                isEdit.setEdit(true);
              }}
              size={24}
            />
          )}
        </View>
      ) : null}

      {rightElement ? (
        <View className={'items-end'} style={{ width: 40 }}>
          {rightElement}
        </View>
      ) : null}
    </View>
  );
};
