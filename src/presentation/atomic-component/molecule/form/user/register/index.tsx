import { Button, InputController } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { gap } from 'main/utils';
import { useRegister } from 'data/use-case';

export const RegisterForm: FC = () => {
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    onSubmit,
    control
  } = useRegister();
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={'flex flex-col w-full'}
        {...gap(16)}
      >
        <InputController
          control={control}
          error={errors.fullName?.message}
          isRequired
          label={'Nome completo'}
          name={'fullName'}
          placeholder={'Digite seu nome completo'}
        />

        <InputController
          autoCapitalize={'none'}
          control={control}
          error={errors.email?.message}
          inputMode={'email'}
          isRequired
          label={'E-mail'}
          name={'email'}
          placeholder={'Digite seu e-mail'}
        />

        <InputController
          autoCapitalize={'none'}
          control={control}
          error={errors.password?.message}
          isRequired
          label={'Senha'}
          name={'password'}
          placeholder={'Digite sua senha'}
          rightIcon={{
            name: hidePassword ? 'visibility' : 'visibility-off',
            onPress: () => setHidePassword(!hidePassword)
          }}
          secureTextEntry={hidePassword}
        />

        <InputController
          autoCapitalize={'none'}
          control={control}
          error={errors.confirmPassword?.message}
          isRequired
          label={'Confirme sua Senha'}
          name={'confirmPassword'}
          placeholder={'Digite sua senha novamente'}
          rightIcon={{
            name: hidePasswordConfirm ? 'visibility' : 'visibility-off',
            onPress: () => setHidePasswordConfirm(!hidePasswordConfirm)
          }}
          secureTextEntry={hidePasswordConfirm}
        />

        <Button
          buttonProps={{
            className: 'mb-5 mt-3'
          }}
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          text={'Cadastrar'}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
