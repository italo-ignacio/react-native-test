import { Button, FetchOnScroll, VehicleCard } from 'presentation/atomic-component/atom';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName } from 'main/config';
import { Text, View } from 'react-native';
import { useInfiniteScroll } from 'data/hooks';
import type { FC, ReactElement } from 'react';
import type { Vehicle } from 'domain/models';

export const VehicleContainer: FC = () => {
  const { data, ...query } = useInfiniteScroll<Vehicle>({
    apiRoute: '/vehicle/my',
    limit: 30,
    queryName: QueryName.vehicle,
    route: 'vehicle'
  });

  return (
    <PrivateContainer headerTitle={'Meus Veículos'}>
      <View>
        <Text className={'text-primary text-base font-semibold'}>Veículo Selecionado</Text>

        <VehicleCard
          vehicle={{
            id: 12,
            licensePlate: 'dsas',
            serialNumber: 'dsas',
            typeOfFuel: 1,
            vehicleModel: {
              id: 12,
              name: 'Uno',
              vehicleBrand: {
                id: 12,
                imageName: 'fiat.png',
                name: 'Fiat'
              }
            }
          }}
        />
      </View>

      <View className={'max-h-[50vh]'}>
        <View className={'flex flex-row justify-between mb-2 items-center'}>
          <Text className={'text-primary text-base font-semibold'}>Meus Veículos</Text>

          <Button
            leftIcon={'add'}
            onPress={(): void => console.log('aaa')}
            size={'small'}
            text={'Novo'}
          />
        </View>

        <FetchOnScroll
          data={data ?? []}
          hideSeparator
          keyExtractor={(item): string => item.id}
          query={query}
          renderItem={({ item, index }): ReactElement => {
            const itemValue = item as Vehicle;

            return <VehicleCard key={itemValue.id} isFirst={index === 0} vehicle={itemValue} />;
          }}
        />
      </View>
    </PrivateContainer>
  );
};
