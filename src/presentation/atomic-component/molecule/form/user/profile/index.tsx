import { Button, InputController } from 'presentation/atomic-component/atom';
import { type FC, useEffect, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { useAppSelector } from 'store';
import { useEditUser } from 'data/use-case';

export const ProfileForm: FC = () => {
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    onSubmit,
    setValue,
    control
  } = useEditUser();

  const { user } = useAppSelector((state) => state.persist);
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (user) {
      setValue('fullName', `${user.firstName} ${user.lastName}`);
      setValue('email', user.email);
    }
  }, [user]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View
        className={
          'flex flex-col w-full divide-y px-2 rounded-md divide-gray-350 bg-white border border-gray-350'
        }
        {...gap(12)}
      >
        <View className={'flex flex-row items-center pt-2 px-2'} {...gap(24)}>
          <Ionicons color={colors.primary} name={'person'} size={24} />

          <View>
            <InputController
              control={control}
              error={errors.fullName?.message}
              isRequired
              label={'Nome Completo'}
              maxWidth={'90%'}
              name={'fullName'}
              placeholder={'Digite seu nome completo'}
            />
          </View>
        </View>

        <View className={'flex flex-row items-center pt-2 px-2'} {...gap(24)}>
          <Ionicons color={colors.primary} name={'mail'} size={24} />

          <View>
            <InputController
              autoCapitalize={'none'}
              control={control}
              error={errors.email?.message}
              inputMode={'email'}
              isRequired
              label={'E-mail'}
              maxWidth={'90%'}
              name={'email'}
              placeholder={'Digite seu e-mail'}
            />
          </View>
        </View>

        <View className={'flex flex-row items-center py-3 pt-2 px-2'} {...gap(24)}>
          <MaterialIcons color={colors.primary} name={'password'} size={24} />

          <View>
            <InputController
              autoCapitalize={'none'}
              control={control}
              error={errors.password?.message}
              label={'Senha'}
              maxWidth={'90%'}
              name={'password'}
              placeholder={'Digite sua senha'}
              rightIcon={{
                name: hidePassword ? 'visibility' : 'visibility-off',
                onPress: () => setHidePassword(!hidePassword)
              }}
              secureTextEntry={hidePassword}
            />
          </View>
        </View>
      </View>

      <Button
        buttonProps={{
          className: 'mt-4'
        }}
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        text={'Atualizar'}
      />
    </KeyboardAvoidingView>
  );
};
