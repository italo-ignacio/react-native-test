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
import { useCallback, useState } from 'react';
import { useDebounce, useInfiniteScroll, useRouter } from 'data/hooks';
import { useFocusEffect } from '@react-navigation/native';
import type { FC, ReactElement } from 'react';
import type { VehicleBrand } from 'domain/models';

export const Brand: FC = () => {
  const [search, setSearch] = useState('');
  const [searchDebounce, setSearchDebounce] = useState('');
  const { navigate } = useRouter();

  useDebounce(
    () => {
      setSearch(searchDebounce);
    },
    [searchDebounce],
    500
  );

  const { data, ...query } = useInfiniteScroll<VehicleBrand>({
    filters: { search },
    limit: 50,
    queryName: QueryName.vehicleBrand,
    route: 'vehicleBrand'
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(QueryName.vehicleBrand);
    }, [queryClient])
  );

  return (
    <PrivateContainer headerTitle={'Marcas'}>
      <View className={'flex flex-row items-center justify-between'}>
        <Text className={'text-primary text-lg font-semibold'}>Marcas Cadastradas</Text>

        <Button
          leftIcon={'add'}
          onPress={(): void => {
            navigate(paths.brandRegister);
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
          const itemValue = item as VehicleBrand;

          return (
            <FetchOnScrollItem
              key={itemValue.id}
              image={itemValue.imageName}
              name={itemValue.name}
              onPress={(): void => {
                navigate(paths.brandEdit, itemValue);
              }}
            />
          );
        }}
      />
    </PrivateContainer>
  );
};
