import { BrandImage, Button, FetchOnScroll, LabelInput } from 'presentation/atomic-component/atom';
import { type FC, useCallback, useState } from 'react';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName, paths } from 'main/config';
import { Text, TouchableOpacity, View } from 'react-native';
import { queryClient } from 'infra/lib';
import { useDebounce, useInfiniteScroll, useRouter } from 'data/hooks';
import { useFocusEffect } from '@react-navigation/native';
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

      <FetchOnScroll query={query}>
        {data?.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            className={'flex flex-row items-center justify-between p-2 pt-4'}
            onPress={(): void => {
              navigate(paths.brandEdit, item);
            }}
          >
            <Text className={'text-primary font-semibold'}>{item.name}</Text>
            <BrandImage imageName={item.imageName} size={'small'} />
          </TouchableOpacity>
        ))}
      </FetchOnScroll>
    </PrivateContainer>
  );
};
