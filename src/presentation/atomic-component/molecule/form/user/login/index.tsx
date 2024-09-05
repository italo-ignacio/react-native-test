import { Button, InputController, LinkButton } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { useLogin } from 'data/use-case';

export const LoginForm: FC = () => {
  const {
    formState: { isSubmitting, errors },
    onSubmit,
    control,
    handleSubmit
  } = useLogin();
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} {...gap(10)}>
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

      <LinkButton
        className={'my-2 mb-6'}
        path={paths.recoverPassword}
        style={{ alignSelf: 'flex-end' }}
        text={'Esqueci minha senha'}
      />

      <Button isLoading={isSubmitting} onPress={handleSubmit(onSubmit)} text={'Fazer login'} />

      <View className={'my-4 flex flex-row justify-center w-full'}>
        <Text>Se não possui uma conta, </Text>
        <LinkButton path={paths.register} text={'clique aqui!'} />
      </View>
    </KeyboardAvoidingView>
  );
};
