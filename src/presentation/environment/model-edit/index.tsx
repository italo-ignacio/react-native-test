import { BrandSelect } from 'presentation/atomic-component/molecule/select/brand';
import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { Keyboard, Text, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, hasConnection, resolverError } from 'main/utils';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import type { FC } from 'react';
import type { SelectValues } from 'presentation/atomic-component/atom';
import type { VehicleModel } from 'domain/models';

export const ModelEdit: FC = () => {
  const { params } = useRoute();
  const vehicleModel = params as VehicleModel;

  const [name, setName] = useState(vehicleModel.name);

  const [selectValue, setSelectValue] = useState<SelectValues | null>({
    item: vehicleModel.vehicleBrand,
    label: vehicleModel.vehicleBrand?.name ?? '',
    value: String(vehicleModel.vehicleBrand?.id)
  });

  const sendRequest = async (): Promise<void> => {
    if (!hasConnection()) {
      callToast.error('Sem conexão com a internet');
      return;
    }

    if (name.length < 1) {
      callToast.error('Preencha o nome');
      return;
    }

    if (!selectValue || typeof Number(selectValue?.value) !== 'number') {
      callToast.error('Selecione uma marca');
      return;
    }

    try {
      await api.put({
        body: { name, vehicleBrandId: Number(selectValue.value) },
        id: vehicleModel.apiId ?? vehicleModel.id,
        route: apiPaths.vehicleModel
      });

      callToast.success('Atualizado com sucesso');
      Keyboard.dismiss();
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <PrivateContainer headerTitle={'Editar Modelo'}>
      <Text className={'text-primary text-base font-semibold'}>Informações do modelo</Text>

      <LabelInput
        isRequired
        label={'Nome'}
        onChangeText={(value): void => setName(value)}
        placeholder={'Digite o nome do modelo'}
        value={name}
      />

      <BrandSelect selectValue={selectValue} setSelectValue={setSelectValue} />

      <View className={'mt-auto'}>
        <Button onPress={sendRequest} text={'Atualizar'} />
      </View>
    </PrivateContainer>
  );
};
