/* eslint-disable no-extra-parens */
import { BrandImage, Button, DefaultCard, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName, apiPaths } from 'main/config';
import { Text, View } from 'react-native';
import { api } from 'infra/http';
import { callToast, gap, resolverError } from 'main/utils';
import { colors } from 'presentation/style';
import { queryClient } from 'infra/lib';
import { useRoute } from '@react-navigation/native';
import type { VehicleBrand } from 'domain/models';

export const BrandEdit: FC = () => {
  const { params } = useRoute();
  const vehicleBrand = params as VehicleBrand;

  const [name, setName] = useState(vehicleBrand.name);
  const [newName, setNewName] = useState(vehicleBrand.name);
  const [isEdit, setIsEdit] = useState(false);

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
              leftElement: (
                <MaterialCommunityIcons color={colors.primary} name={'car-cog'} size={24} />
              ),
              rightElement: isEdit ? (
                <MaterialIcons
                  color={colors.primary}
                  name={'cancel'}
                  onPress={(): void => setIsEdit(false)}
                  size={24}
                />
              ) : (
                <MaterialIcons
                  color={colors.primary}
                  name={'edit'}
                  onPress={(): void => {
                    setName(newName);
                    setIsEdit(true);
                  }}
                  size={24}
                />
              ),
              subtitle: isEdit ? (
                <LabelInput onChangeText={(value): void => setName(value)} value={name} />
              ) : (
                newName
              ),
              title: 'Nome'
            }
          ]}
        />

        {isEdit ? (
          <Button
            onPress={async (): Promise<void> => {
              if (name.length < 1) callToast.error('Preencha o nome');
              else
                try {
                  await api.put({
                    body: { name },
                    id: vehicleBrand.apiId ? vehicleBrand.apiId : vehicleBrand.id,
                    route: apiPaths.vehicleBrand
                  });
                  callToast.success('Atualizado com sucesso');
                  setIsEdit(false);
                  queryClient.invalidateQueries(QueryName.vehicleBrand);
                  setNewName(name);
                } catch (error) {
                  console.log(error);

                  resolverError(error);
                }
            }}
            text={'Atualizar'}
          />
        ) : null}
      </View>
    </PrivateContainer>
  );
};
