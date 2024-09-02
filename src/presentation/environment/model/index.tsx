import {
  Button,
  FetchOnScroll,
  FetchOnScrollItem,
  LabelInput
} from 'presentation/atomic-component/atom';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName, paths } from 'main/config';
import { Text, View } from 'react-native';
import { useDebounce, useInfiniteScroll, useRouter } from 'data/hooks';
import { useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { VehicleModel } from 'domain/models';

export const Model: FC = () => {
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

  const { data, ...query } = useInfiniteScroll<VehicleModel>({
    filters: { search },
    limit: 50,
    queryName: QueryName.vehicleModel,
    route: 'vehicleModel'
  });

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
            />
          );
        }}
      />
    </PrivateContainer>
  );
};
