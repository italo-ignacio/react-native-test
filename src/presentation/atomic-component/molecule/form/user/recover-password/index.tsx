import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { gap } from 'main/utils';
import { useFindVehicleBrandQuery } from 'infra/cache';
import { useRecoverPassword } from 'data/use-case';
import type { FC } from 'react';

export const RecoverPasswordForm: FC = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    onSubmit
  } = useRecoverPassword();

  const vehicleBrandQuery = useFindVehicleBrandQuery({});

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={'flex flex-col w-full'}
        {...gap(22)}
      >
        {vehicleBrandQuery.data?.map((item) => (
          <View key={item.id}>
            <Text>
              {item.id}-{item.apiId ?? 'null'}
            </Text>

            <Text>{item.name}</Text>
          </View>
        ))}

        <LabelInput
          autoCapitalize={'none'}
          inputMode={'email'}
          isRequired
          label={'E-mail'}
          placeholder={'Digite seu e-mail'}
        />

        <Button
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          text={'Solicitar redefinição'}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
