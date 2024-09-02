/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-parens */
import { FetchOnScroll } from '../fetch-on-scroll';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LabelInput } from '../label-input';
import { SelectItem } from '../select-item';
import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { infiniteScrollProps } from 'data/hooks';

export interface SelectValues {
  label: string;
  value: string;
  item?: any;
}

interface SelectProps {
  options: SelectValues[];
  value: SelectValues | SelectValues[] | null;
  label?: string;
  onChange: (value: SelectValues | SelectValues[] | null | undefined) => void;
  onSearch?: (value: string) => void;
  renderItem?: (item: SelectValues) => ReactElement;
  renderChildren?: (item: SelectValues, onPress?: () => void) => ReactElement;
  placeholder?: string;
  query?: infiniteScrollProps;
  isMultiple?: boolean;
  isRequired?: boolean;
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  isRequired,
  isMultiple,
  query,
  renderChildren,
  renderItem,
  onChange,
  onSearch,
  label,
  placeholder
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (): void => {
    setIsFocused(true);
    setInputValue('');
    if (onSearch) onSearch('');
  };

  const handleBlur = (): void => {
    if (value && !Array.isArray(value)) setInputValue(value.label);
    else setInputValue('');
    setIsFocused(false);
  };

  const handleSelectItem = (item: SelectValues | null): void => {
    if (isMultiple) {
      if (item && value && Array.isArray(value))
        if (value.find((arrayItem) => arrayItem.value === item?.value))
          onChange([...value].filter((arrayItem) => arrayItem.value !== item?.value));
        else onChange([...value, item]);
    } else {
      onChange(item);

      if (item && !Array.isArray(item)) setInputValue(item.label);

      setIsFocused(false);
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    if (value && !Array.isArray(value)) setInputValue(value.label);
    else setInputValue('');
  }, [value]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'z-10 max-h-[300px]'}
    >
      <LabelInput
        isRequired={isRequired}
        label={label}
        onBlur={handleBlur}
        onChangeText={(text): void => {
          setInputValue(text);
          if (onSearch) onSearch(text);
        }}
        onFocus={handleFocus}
        placeholder={placeholder}
        rightIcon={{
          name: isFocused ? 'arrow-drop-up' : 'arrow-drop-down',
          onPress: (): void => setIsFocused(!isFocused),
          size: 24
        }}
        value={inputValue}
      />

      {isFocused ? (
        <View className={'p-0.5 bg-gray-300'}>
          {query ? (
            <FetchOnScroll
              data={options ?? []}
              keyExtractor={(item): string => String(item.value)}
              query={query}
              renderItem={({ item }): ReactElement => {
                const itemValue = item as SelectValues;

                if (renderItem) renderItem(itemValue);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className={'bg-white border-b border-gray-250'}
                    onPress={(): void => handleSelectItem(itemValue)}
                  >
                    <SelectItem
                      key={itemValue?.value}
                      active={
                        Array.isArray(value)
                          ? !!value.find((arrayItem) => arrayItem.value === itemValue?.value)
                          : itemValue.value === value?.value
                      }
                      onPress={renderChildren ? undefined : (): void => handleSelectItem(itemValue)}
                    >
                      {renderChildren ? (
                        renderChildren(item, (): void => handleSelectItem(itemValue))
                      ) : (
                        <Text>{item.label}</Text>
                      )}
                    </SelectItem>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <FlatList
              data={options}
              keyExtractor={(item): string => String(item.value)}
              keyboardShouldPersistTaps={'always'}
              renderItem={({ item }): ReactElement => {
                if (renderItem) renderItem(item);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className={'bg-white p-2 border-b border-gray-250'}
                    onPress={(): void => handleSelectItem(item)}
                  >
                    {renderChildren ? renderChildren(item) : <Text>{item.label}</Text>}
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};
