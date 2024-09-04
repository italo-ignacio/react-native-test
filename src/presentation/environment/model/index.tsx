import {
  Button,
  FetchOnScroll,
  FetchOnScrollItem,
  LabelInput
} from 'presentation/atomic-component/atom';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName, paths } from 'main/config';
import { Text, View } from 'react-native';
import { queryClient } from 'infra/lib';
import { useAppSelector } from 'store';
import { useCallback, useState } from 'react';
import { useDebounce, useInfiniteScroll, useRouter } from 'data/hooks';
import { useFocusEffect } from '@react-navigation/native';
import type { FC, ReactElement } from 'react';
import type { VehicleModel } from 'domain/models';

export const Model: FC = () => {
  const [search, setSearch] = useState('');
  const [searchDebounce, setSearchDebounce] = useState('');
  const { navigate } = useRouter();

  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  useDebounce(
    () => {
      setSearch(searchDebounce);
    },
    [searchDebounce],
    500
  );

  const { data, ...query } = useInfiniteScroll<VehicleModel>({
    filters: { search },
    limit: 30,
    queryName: QueryName.vehicleModel,
    route: 'vehicleModel'
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(QueryName.vehicleModel);
    }, [queryClient, hasInternetConnection])
  );

  return (
    <PrivateContainer headerTitle={'Modelos'}>
      <View className={'flex flex-row items-center justify-between'}>
        <Text className={'text-primary text-lg font-semibold'}>Modelos Cadastrados</Text>

        <Button
          leftIcon={'add'}
          onPress={(): void => {
            navigate(paths.modelRegister);
          }}
          size={'small'}
          text={' Novo'}
        />
      </View>

      <LabelInput
        onChangeText={(value): void => {
          setSearchDebounce(value);
        }}
        placeholder={'Pesquisar...'}
        rightIcon={{ name: 'search' }}
        value={searchDebounce}
      />

      <FetchOnScroll
        data={data ?? []}
        keyExtractor={(item): string => item.id}
        query={query}
        renderItem={({ item }): ReactElement => {
          const itemValue = item as VehicleModel;

          return (
            <FetchOnScrollItem
              key={itemValue.id}
              name={itemValue.name}
              onPress={(): void => {
                navigate(paths.modelEdit, itemValue);
              }}
              size={'big'}
            />
          );
        }}
      />
    </PrivateContainer>
  );
};
