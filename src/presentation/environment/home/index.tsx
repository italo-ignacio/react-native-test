import { Button, ScrollView, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { useAppSelector } from 'store';
import { useBluetooth, useDatabase } from 'data/hooks';
import type { FC } from 'react';

export const Home: FC = () => {
  const { user } = useAppSelector((state) => state.persist);
  const database = useDatabase();
  const { startMonitor, stopMonitor, isMonitoring, findVehicleByVin } = useBluetooth();

  return (
    <PrivateContainer headerSubtitle={`${user?.firstName} ${user?.firstName}`} headerTitle={'Olá,'}>
      <ScrollView>
        <Button
          onPress={async (): Promise<void> => {
            const offlineQueue = await database.find('offline_queue');

            console.info('offlineQueue', offlineQueue.length);
            console.info('offlineQueue', offlineQueue);
            const vehicleBrands = await database.find('vehicle_brands');

            console.info('vehicleBrands', vehicleBrands.length);
            const vehicleModels = await database.find('vehicle_models');

            console.info('vehicleModels', vehicleModels.length);
          }}
          title={'Find'}
        />

        <View className={'mt-4'} />

        <Button
          onPress={isMonitoring ? stopMonitor : startMonitor}
          title={isMonitoring ? 'Monitorando ...' : 'Not'}
        />
      </ScrollView>
    </PrivateContainer>
  );
};
