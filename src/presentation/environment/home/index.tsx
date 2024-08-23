import { Button, Text, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { useAppSelector } from 'store';
import { useFindVehicleBrandQuery } from 'infra/cache';
import type { FC } from 'react';

export const Home: FC = () => {
  const vehicleBrandQuery = useFindVehicleBrandQuery({ limit: 10, page: 1 });

  const { user } = useAppSelector((state) => state.persist);

  return (
    <PrivateContainer headerSubtitle={`${user?.firstName} ${user?.firstName}`} title={'Ola'}>
      <Button
        onPress={(): void => {
          vehicleBrandQuery.refetch();
        }}
        title={'Home'}
      />

      {vehicleBrandQuery.data?.map((item) => (
        <View key={item.id}>
          <Text>
            {item.id}-{item.apiId ?? 'null'}
          </Text>

          <Text>{item.name}</Text>
        </View>
      ))}
    </PrivateContainer>
  );
};
