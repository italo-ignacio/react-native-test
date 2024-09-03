/* eslint-disable no-extra-parens */
import { BrandImage, Button, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, hasConnection, resolverError } from 'main/utils';
import { useRoute } from '@react-navigation/native';
import type { VehicleBrand } from 'domain/models';

export const BrandEdit: FC = () => {
  const { params } = useRoute();
  const vehicleBrand = params as VehicleBrand;

  const [name, setName] = useState(vehicleBrand.name);

  const sendRequest = async (): Promise<void> => {
    if (!hasConnection()) {
      callToast.error('Sem conexão com a internet');
      return;
    }

    if (name.length < 1) callToast.error('Preencha o nome');
    else
      try {
        await api.put({
          body: { name },
          id: vehicleBrand.apiId ?? vehicleBrand.id,
          route: apiPaths.vehicleBrand
        });

        callToast.success('Atualizado com sucesso');
        Keyboard.dismiss();
      } catch (error) {
        resolverError(error);
      }
  };

  return (
    <PrivateContainer headerTitle={'Editar marca'}>
      <Text className={'text-primary text-base font-semibold'}>Informações da Marca</Text>

      <View className={'items-center'}>
        <BrandImage imageName={vehicleBrand.imageName} />
      </View>

      <LabelInput
        isRequired
        label={'Nome'}
        onChangeText={(value): void => setName(value)}
        placeholder={'Digite o nome da marca'}
        value={name}
      />

      <View className={'mt-auto'}>
        <Button onPress={sendRequest} text={'Atualizar'} />
      </View>
    </PrivateContainer>
  );
};
