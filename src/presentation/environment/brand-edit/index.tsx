/* eslint-disable no-extra-parens */
import { BrandImage, Button, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName } from 'main/config';
import { Text, View } from 'react-native';
import { callToast, resolverError } from 'main/utils';
import { queryClient } from 'infra/lib';
import { useRequest } from 'data/hooks';
import { useRoute } from '@react-navigation/native';
import type { VehicleBrand } from 'domain/models';

export const BrandEdit: FC = () => {
  const { params } = useRoute();
  const vehicleBrand = params as VehicleBrand;

  const [name, setName] = useState(vehicleBrand.name);
  const { makeRequest } = useRequest();

  const sendRequest = async (): Promise<void> => {
    if (name.length < 1) callToast.error('Preencha o nome');
    else
      try {
        await makeRequest({
          body: { name },
          ids: { apiId: vehicleBrand.apiId, id: vehicleBrand.id },
          method: 'PUT',
          route: 'vehicleBrand'
        });
        callToast.success('Atualizado com sucesso');
        queryClient.invalidateQueries(QueryName.vehicleBrand);
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
