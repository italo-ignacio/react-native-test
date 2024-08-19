import { Button, LabelInput, LinkButton } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { useLogin } from 'data/use-case';

export const LoginForm: FC = () => {
  const { isSubmitting, onSubmit, handleSubmit } = useLogin();
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex flex-col w-full'}
      {...gap(10)}
    >
      <LabelInput
        autoCapitalize={'none'}
        inputMode={'email'}
        isRequired
        label={'E-mail'}
        placeholder={'Digite seu e-mail'}
      />

      <LabelInput
        isRequired
        label={'Senha'}
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
