import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { gap } from 'main/utils';
import { useLogin } from 'data/use-case';

export const RegisterForm: FC = () => {
  const { isSubmitting } = useLogin();
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex flex-col w-full'}
      {...gap(16)}
    >
      <LabelInput isRequired label={'Nome completo'} placeholder={'Digite seu nome completo'} />

      <LabelInput
        autoCapitalize={'none'}
        inputMode={'email'}
        isRequired
        label={'E-mail'}
        placeholder={'Digite seu e-mail'}
      />

      <LabelInput
        autoCapitalize={'none'}
        isRequired
        label={'Senha'}
        placeholder={'Digite sua senha'}
        rightIcon={{
          name: hidePassword ? 'visibility' : 'visibility-off',
          onPress: () => setHidePassword(!hidePassword)
        }}
        secureTextEntry={hidePassword}
      />

      <LabelInput
        autoCapitalize={'none'}
        isRequired
        label={'Confirme sua Senha'}
        placeholder={'Digite sua senha novamente'}
        rightIcon={{
          name: hidePasswordConfirm ? 'visibility' : 'visibility-off',
          onPress: () => setHidePasswordConfirm(!hidePasswordConfirm)
        }}
        secureTextEntry={hidePasswordConfirm}
      />

      <Button
        buttonProps={{
          className: 'mt-5'
        }}
        isLoading={isSubmitting}
        text={'Cadastrar'}
      />
    </KeyboardAvoidingView>
  );
};
