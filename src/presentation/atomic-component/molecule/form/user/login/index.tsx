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

  const saveBrands = async (): Promise<void> => {
    try {
      await database.create('vehicle_models', {
        name: 'Toyota',
        vehicleBrandId: 3
      });

      // await database.execAsync(`
      //   INSERT INTO ${TableName.VEHICLEBRANDS} (name, imageName) VALUES ${carBrands.map(
      //   (item, index) =>
      //     `("${item.name}", "${item.imageName}")${index + 1 === carBrands.length ? ';' : ''}`
      // )}
      // `);
      // result.forEach(async (item): Promise<void> => {
      //   const cars = carBrands.find((carItem) => item.name === carItem.name);
      //   if (cars)
      //     await database.execAsync(`
      //   INSERT INTO ${TableName.VEHICLEMODELS} (name, vehicleBrandId) VALUES ${cars.models.map(
      //       (model, index) => `("${model}",${item.id})${index + 1 === carBrands.length ? ';' : ''}`
      //     )}
      // `);
      // });
      // await database.execAsync(`
      //   DELETE FROM ${TableName.VEHICLEBRANDS}
      // `);
      // const aa = {};
      // console.log(
      //   carBrands.forEach((item) => {
      //     if (aa[item.name]) aa[item.name].push('2');
      //     else Object.assign(aa, { [item.name]: ['1'] });
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex flex-col w-full'}
      {...gap(10)}
    >
      <Button onPress={saveBrands} text={'aaaaaaaaaa'} />

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
