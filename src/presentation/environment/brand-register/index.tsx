import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, hasConnection, resolverError } from 'main/utils';

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
