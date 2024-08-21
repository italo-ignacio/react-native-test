import { Button, LabelInput, LinkButton } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { useDatabase } from 'data/hooks';
import { useLogin } from 'data/use-case';

export const LoginForm: FC = () => {
  const { isSubmitting, onSubmit, handleSubmit } = useLogin();
  const [hidePassword, setHidePassword] = useState(true);

  const database = useDatabase();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex flex-col w-full'}
      {...gap(10)}
    >
      <Button
        onPress={async (): Promise<void> => {
          console.log(new Date());

          console.log(
            await database.find('vehicle_brands', {
              select: {
                name: true
              }
            })
          );
          console.log(new Date());
        }}
        text={'find'}
      />

      <Button
        onPress={async (): Promise<void> => {
          console.log(
            await database.create('vehicle_brands', {
              data: {
                imageName: 'image2',
                name: 'bbbbbbbbbbbb'
              },
              select: {
                id: true,
                imageName: true,
                name: true
              }
            })
          );
        }}
        text={'create'}
      />

      <Button
        onPress={async (): Promise<void> => {
          await database.update('vehicle_brands', {
            data: {
              name: 'teste 10000'
            },
            where: {
              imageName: {
                operator: '=',
                value: 'teste 1'
              }
            }
          });
        }}
        text={'update'}
      />

      <Button
        onPress={async (): Promise<void> => {
          await database.delete('vehicle_brands', {});
        }}
        text={'delete'}
      />

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
