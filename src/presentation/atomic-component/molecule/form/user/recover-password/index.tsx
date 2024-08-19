import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { gap } from 'main/utils';
import { useLogin } from 'data/use-case';
import type { FC } from 'react';

export const RecoverPasswordForm: FC = () => {
  const { isSubmitting } = useLogin();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex flex-col w-full'}
      {...gap(22)}
    >
      <LabelInput
        autoCapitalize={'none'}
        inputMode={'email'}
        isRequired
        label={'E-mail'}
        placeholder={'Digite seu e-mail'}
      />

      <Button isLoading={isSubmitting} text={'Solicitar redefinição'} />
    </KeyboardAvoidingView>
  );
};
