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
import { setSelectOpen } from 'store/net-info/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { infiniteScrollProps } from 'data/hooks';

export interface SelectValues {
  label: string;
  value: string;
  item?: any;
}

interface SelectProps {
  id: string;
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
  hideKeyboard?: boolean;
  isRequired?: boolean;
  error?: string;
  hideMessage?: boolean;
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  id,
  isRequired,
  isMultiple,
  query,
  hideKeyboard,
  error,
  hideMessage,
  renderChildren,
  renderItem,
  onChange,
  onSearch,
  label,
  placeholder
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  const { selectOpen } = useAppSelector((state) => state.netInfo);

  const openSelect = (): void => {
    dispatch(setSelectOpen(id));
    setIsFocused(true);
  };

  const closeSelect = (): void => {
    dispatch(setSelectOpen(null));
    setIsFocused(false);
  };

  const handleFocus = (): void => {
    openSelect();
    setInputValue('');
    if (onSearch) onSearch('');
  };

  const handleBlur = (): void => {
    if (value && !Array.isArray(value)) setInputValue(value.label);
    else setInputValue('');

    closeSelect();
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

  useEffect(() => {
    if (selectOpen !== id) setIsFocused(false);
  }, [selectOpen]);

  return (
    <View style={{ position: 'relative' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LabelInput
          disabled={hideKeyboard}
          error={error}
          isRequired={isRequired}
          isSelect
          label={label}
          onBlur={handleBlur}
          onChangeText={(text): void => {
            setInputValue(text);
            if (onSearch) onSearch(text);
          }}
          onFocus={handleFocus}
          onTextPress={
            hideKeyboard
              ? (): void => {
                  if (isFocused) closeSelect();
                  else openSelect();
                  if (onSearch) onSearch('');
                }
              : undefined
          }
          placeholder={placeholder}
          rightIcon={{
            name: isFocused ? 'arrow-drop-up' : 'arrow-drop-down',
            onPress(): void {
              if (isFocused) closeSelect();
              else openSelect();
              if (onSearch) onSearch('');
            },
            size: 24
          }}
          value={inputValue}
        />

        {error && !hideMessage ? <Text className={'text-red mt-2'}>{error}</Text> : null}
      </KeyboardAvoidingView>

      {isFocused ? (
        <View
          className={'p-0.5 w-full bg-gray-300 max-h-[300px]'}
          style={{
            flex: 1,
            position: 'absolute',
            top: 67,
            zIndex: 99999
          }}
        >
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
    </View>
  );
};
