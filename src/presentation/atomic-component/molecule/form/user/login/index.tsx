import { Button, InputController, LinkButton } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { useDatabase } from 'data/hooks';
import { useLogin } from 'data/use-case';

export const LoginForm: FC = () => {
  const {
    formState: { isSubmitting, errors },
    onSubmit,
    control,
    handleSubmit
  } = useLogin();
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
          try {
            console.log(
              JSON.stringify(
                await database.find('vehicle_brands', {
                  select: {
                    apiId: true,
                    createdAt: true,
                    id: true
                  },
                  where: {
                    createdAt: {
                      operator: '>',
                      value: '2024-08-22 19:47:37'
                    }
                  }
                })
              )
            );
            console.log('succsses');
          } catch (error) {
            console.log(error);
          }
        }}
        text={'find'}
      />

      <Button
        onPress={async (): Promise<void> => {
          console.log(
            await database.create('vehicles', {
              data: {
                apiId: 1,
                licensePlate: '000',
                serialNumber: '10',
                typeOfFuel: 1,
                vehicleModelId: 1
              },
              select: {
                id: true
              }
            })
          );
        }}
        text={'create'}
      />

      <Button
        onPress={async (): Promise<void> => {
          try {
            await database.upsertData('vehicle_brands', {
              data: [
                {
                  apiId: 1,
                  imageName: 'marca 1.png',
                  name: 'marca 1'
                },
                {
                  apiId: 2,
                  imageName: 'marca 2.png',
                  name: 'marca 2'
                },
                {
                  apiId: 3,
                  imageName: 'marca 3.png',
                  name: 'marca 3'
                },
                {
                  apiId: 4,
                  imageName: 'marca 4.png',
                  name: 'marca 4'
                },
                {
                  apiId: 5,
                  imageName: 'marca 5.png',
                  name: 'marca 5'
                }
              ]
            });
            console.log('succsses');
          } catch (error) {
            console.log(error);
          }
        }}
        text={'upsert'}
      />

      <Button
        onPress={async (): Promise<void> => {
          await database.update('vehicle_brands', {
            data: {
              name: 'Renato'
            },
            where: {
              id: {
                operator: '=',
                value: 1
              }
            }
          });
        }}
        text={'update'}
      />

      <Button
        onPress={async (): Promise<void> => {
          await database.delete('vehicles', {});
          await database.delete('vehicle_models', {});
          await database.delete('vehicle_brands', {});
        }}
        text={'delete'}
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
