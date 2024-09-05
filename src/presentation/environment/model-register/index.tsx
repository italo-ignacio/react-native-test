import { BrandSelect } from 'presentation/atomic-component/molecule/select/brand';
import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { Keyboard, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, hasConnection, resolverError } from 'main/utils';
import { useState } from 'react';
import type { FC } from 'react';
import type { SelectValues } from 'presentation/atomic-component/atom';

export const ModelRegister: FC = () => {
  const [name, setName] = useState('');
  const [selectValue, setSelectValue] = useState<SelectValues | null>(null);

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
      await api.post({
        body: { name, vehicleBrandId: Number(selectValue.value) },
        route: apiPaths.vehicleModel
      });

      callToast.success('Cadastrado com sucesso');
      setName('');
      setSelectValue(null);
      Keyboard.dismiss();
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <PrivateContainer headerTitle={'Novo Modelo'}>
      <LabelInput
        isRequired
        label={'Nome'}
        onChangeText={(value): void => setName(value)}
        placeholder={'Digite o nome do modelo'}
        value={name}
      />

      <BrandSelect selectValue={selectValue} setSelectValue={setSelectValue} />

      <View className={'mt-auto'}>
        <Button onPress={sendRequest} text={'Cadastrar'} />
      </View>
    </PrivateContainer>
  );
};
