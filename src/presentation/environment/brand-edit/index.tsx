/* eslint-disable no-extra-parens */
import { BrandImage, Button, DefaultCard } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName } from 'main/config';
import { Text, View } from 'react-native';
import { callToast, gap, resolverError } from 'main/utils';
import { colors } from 'presentation/style';
import { queryClient } from 'infra/lib';
import { useRequest } from 'data/hooks';
import { useRoute } from '@react-navigation/native';
import type { VehicleBrand } from 'domain/models';

export const BrandEdit: FC = () => {
  const { params } = useRoute();
  const vehicleBrand = params as VehicleBrand;

  const [name, setName] = useState(vehicleBrand.name);
  const [newName, setNewName] = useState(vehicleBrand.name);
  const [isEdit, setIsEdit] = useState(false);

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
        setIsEdit(false);
        setNewName(name);
      } catch (error) {
        console.log(error);

        resolverError(error);
      }
  };

  return (
    <PrivateContainer headerTitle={newName}>
      <Text className={'text-primary text-base font-semibold'}>Informações da Marca</Text>
      <Text>{vehicleBrand.apiId ?? 'null'}</Text>

      <View {...gap(12)}>
        <View className={'items-center'}>
          <BrandImage imageName={vehicleBrand.imageName} />
        </View>

        <DefaultCard
          items={[
            {
              isEdit: {
                edit: isEdit,
                setEdit: setIsEdit,
                setValue: setName,
                value: name
              },
              leftElement: (
                <MaterialCommunityIcons color={colors.primary} name={'car-cog'} size={24} />
              ),
              subtitle: newName,
              title: 'Nome'
            }
          ]}
        />

        {isEdit ? <Button onPress={sendRequest} text={'Atualizar'} /> : null}
      </View>
    </PrivateContainer>
  );
};
