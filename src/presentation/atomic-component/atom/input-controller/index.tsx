import { Controller } from 'react-hook-form';
import { LabelInput } from '../label-input';
import { Text } from 'react-native';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { LabelInputProps } from '../label-input';
import type { ReactElement } from 'react';

type InputProps<T extends FieldValues> = LabelInputProps & {
  control: Control<T>;
  name: Path<T>;
  error?: string;
  hideMessage?: boolean;
};

export const InputController = <T extends FieldValues>({
  control,
  name,
  hideMessage,
  ...props
}: InputProps<T>): ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...all } }): ReactElement => (
        <>
          <LabelInput {...all} onChangeText={onChange} {...props} />
          {props?.error && !hideMessage ? <Text className={'text-red'}>{props.error}</Text> : null}
        </>
      )}
    />
  );
};
