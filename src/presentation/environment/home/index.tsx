import { Button, Text, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { useAppSelector } from 'store';
import { useFindVehicleBrandQuery } from 'infra/cache';
import type { FC } from 'react';

export const Home: FC = () => {
  const vehicleBrandQuery = useFindVehicleBrandQuery({});

  const { user } = useAppSelector((state) => state.persist);

  return (
    <PrivateContainer headerSubtitle={`${user?.firstName} ${user?.firstName}`} headerTitle={'Olá,'}>
      <Button
        onPress={(): void => {
          vehicleBrandQuery.refetch();
        }}
        title={'Refecth'}
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
