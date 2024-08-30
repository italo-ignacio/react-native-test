import { Button, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName } from 'main/config';
import { View } from 'react-native';
import { callToast, resolverError } from 'main/utils';
import { queryClient } from 'infra/lib';
import { useRequest } from 'data/hooks';

export const BrandRegister: FC = () => {
  const [name, setName] = useState('');
  const { makeRequest } = useRequest();

  const sendRequest = async (): Promise<void> => {
    if (name.length < 1) callToast.error('Preencha o nome');
    try {
      await makeRequest({
        body: { name },
        method: 'POST',
        route: 'vehicleBrand'
      });
      callToast.success('Cadastrado com sucesso');
      queryClient.invalidateQueries(QueryName.vehicleBrand);
      setName('');
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
