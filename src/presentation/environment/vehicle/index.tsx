import { Button, FetchOnScroll, VehicleCard } from 'presentation/atomic-component/atom';
import { type FC, type ReactElement, useCallback } from 'react';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { QueryName, paths } from 'main/config';
import { RegisterVehicleModal } from 'presentation/atomic-component/molecule/modal';
import { Text, View } from 'react-native';
import { gap } from 'main/utils';
import { queryClient } from 'infra/lib';
import { useAppSelector } from 'store';
import { useBluetooth, useInfiniteScroll, useRouter } from 'data/hooks';
import { useFocusEffect } from '@react-navigation/native';
import type { Vehicle } from 'domain/models';

export const VehicleContainer: FC = () => {
  const { data, ...query } = useInfiniteScroll<Vehicle>({
    apiRoute: '/vehicle/my',
    limit: 30,
    queryName: QueryName.vehicle,
    route: 'vehicle'
  });

  const { connected } = useBluetooth();
  const { navigate } = useRouter();
  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(QueryName.vehicle);
    }, [queryClient, hasInternetConnection])
  );

  return (
    <PrivateContainer headerTitle={'Meus Veículos'}>
      <View className={'max-h-[29vh]'}>
        <Text className={'text-primary text-base font-semibold'}>Veículo Conectado</Text>

        {connected.vehicle ? (
          <VehicleCard vehicle={connected.vehicle} />
        ) : (
          <View
            className={
              'mt-2 items-center rounded-md py-4 px-3 w-full bg-white border border-gray-300'
            }
            {...gap(16)}
          >
            <Text className={'text-primary font-semibold text-base'}>
              Nenhum veículo conectado.
            </Text>

            <Button
              onPress={(): void => navigate(paths.bluetooth)}
              size={'small'}
              text={'Conectar veículo'}
            />

            <Button
              onPress={(): void => navigate(paths.vehicleRegister)}
              size={'small'}
              text={'aaaaaaa'}
            />
          </View>
        )}
      </View>

      <View className={'max-h-[50vh]'}>
        <View className={'flex flex-row justify-between mb-2 items-center'}>
          <Text className={'text-primary text-base font-semibold'}>Meus Veículos</Text>
          <RegisterVehicleModal />
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
