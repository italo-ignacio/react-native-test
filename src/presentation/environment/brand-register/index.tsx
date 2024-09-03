import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, hasConnection, resolverError } from 'main/utils';
import { queryClient } from 'infra/lib';

export const BrandRegister: FC = () => {
  const [name, setName] = useState('');

  const sendRequest = async (): Promise<void> => {
    if (!hasConnection()) {
      callToast.error('Sem conexão com a internet');
      return;
    }

    if (name.length < 1) {
      callToast.error('Preencha o nome');
      return;
    }

    try {
      await api.post({
        body: { name },
        route: apiPaths.vehicleBrand
      });

      callToast.success('Cadastrado com sucesso');
      queryClient.invalidateQueries(QueryName.vehicleBrand);
      setName('');
      Keyboard.dismiss();
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <PrivateContainer headerTitle={'Nova Marca'}>
      <LabelInput
        isRequired
        label={'Nome'}
        onChangeText={(value): void => setName(value)}
        placeholder={'Digite o nome da marca'}
        value={name}
      />

      <View className={'mt-auto'}>
        <Button onPress={sendRequest} text={'Cadastrar'} />
      </View>
    </PrivateContainer>
  );
};
