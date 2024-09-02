import { BrandImage, Button, LabelInput, Select } from 'presentation/atomic-component/atom';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName } from 'main/config';
import { Text, TouchableOpacity, View } from 'react-native';
import { callToast, listToSelect, resolverError } from 'main/utils';
import { queryClient } from 'infra/lib';
import { useCallback, useState } from 'react';
import { useDebounce, useInfiniteScroll, useRequest } from 'data/hooks';
import { useFocusEffect } from '@react-navigation/native';
import type { FC, ReactElement } from 'react';
import type { SelectValues } from 'presentation/atomic-component/atom';
import type { VehicleBrand } from 'domain/models';

export const ModelRegister: FC = () => {
  const [name, setName] = useState('');
  const [selectValue, setSelectValue] = useState<SelectValues | null>(null);
  const { makeRequest } = useRequest();

  const [search, setSearch] = useState('');
  const [searchDebounce, setSearchDebounce] = useState('');

  const { data, ...query } = useInfiniteScroll<VehicleBrand>({
    filters: { search },
    limit: 50,
    queryName: QueryName.vehicleBrand,
    route: 'vehicleBrand'
  });

  const sendRequest = async (): Promise<void> => {
    if (name.length < 1) {
      callToast.error('Preencha o nome');
      return;
    }

    if (!selectValue || typeof Number(selectValue?.value) !== 'number') {
      callToast.error('Selecione uma marca');
      return;
    }

    try {
      await makeRequest({
        body: { name, vehicleBrandId: Number(selectValue.value) },
        method: 'POST',
        route: 'vehicleModel'
      });
      callToast.success('Cadastrado com sucesso');
      queryClient.invalidateQueries(QueryName.vehicleModel);
      setName('');
      setSelectValue(null);
    } catch (error) {
      resolverError(error);
    }
  };

  useDebounce(
    () => {
      setSearch(searchDebounce);
    },
    [searchDebounce],
    500
  );

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(QueryName.vehicleBrand);
    }, [queryClient])
  );

  return (
    <PrivateContainer headerTitle={'Novo Modelo'}>
      <LabelInput
        isRequired
        label={'Nome'}
        onChangeText={(value): void => setName(value)}
        placeholder={'Digite o nome do modelo'}
        value={name}
      />

      <Select
        isRequired
        label={'Marca'}
        onChange={(event): void => {
          setSelectValue(event as unknown as SelectValues | null);
        }}
        onSearch={(text): void => setSearchDebounce(text)}
        options={listToSelect(data ?? [])}
        placeholder={'Selecione a marca do modelo'}
        query={query}
        renderChildren={(item, onPress): ReactElement => {
          const itemValue = item.item as VehicleBrand;

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              className={'flex w-full flex-row items-center justify-between '}
              onPress={onPress}
            >
              <Text className={'text-primary font-semibold'}>{itemValue.name}</Text>
              <BrandImage imageName={itemValue.imageName} size={'small'} />
            </TouchableOpacity>
          );
        }}
        value={selectValue}
      />

      <View className={'mt-auto'}>
        <Button onPress={sendRequest} text={'Cadastrar'} />
      </View>
    </PrivateContainer>
  );
};
