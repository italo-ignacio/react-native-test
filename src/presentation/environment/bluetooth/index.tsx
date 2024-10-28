import { DeviceCard } from 'presentation/atomic-component/atom';
import { FlatList, Text, View } from 'react-native';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { gap } from 'main/utils';
import { paths } from 'main/config';
import { useBluetooth, useRouter } from 'data/hooks';
import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';

export const Bluetooth: FC = () => {
  const {
    bluetoothState,
    requestPermissions,
    allDevices,
    connectToDevice,
    connected,
    isScanning,
    state,
    disconnectFromDevice,
    startScan
  } = useBluetooth();

  const [first, setFirst] = useState(true);
  const { navigate } = useRouter();

  useEffect(() => {
    const permission = async (): Promise<void> => {
      await requestPermissions();
    };

    permission();
  }, []);

  useEffect(() => {
    if (bluetoothState === 'on' && !isScanning) startScan();
  }, [bluetoothState]);

  useEffect(() => {
    if (first) setFirst(false);
    else if (connected.vehicle !== null) navigate(paths.vehicleRoutes, { screen: paths.vehicle });
    else if (connected.vehicle === null && connected.vin !== null)
      navigate(paths.vehicleRoutes, { screen: paths.vehicleRegister });
  }, [connected]);

  return (
    <PrivateContainer headerTitle={'Dispositivos'}>
      {bluetoothState === 'off' ? (
        <>
          <Text className={'text-xl font-bold text-center mt-4'}>Bluetooth desativado</Text>

          <Text className={'text-base text-center mt-4'}>
            Ative o Bluetooth nas configurações do seu celular
          </Text>
        </>
      ) : (
        <View {...gap(16)}>
          <View className={'flex flex-row justify-between items-center'}>
            <Text className={'text-primary font-bold text-base'}>Dispositivos Disponíveis</Text>
          </View>

          <View className={'max-h-[71vh]'}>
            <FlatList
              contentContainerStyle={{ gap: 12 }}
              data={allDevices}
              renderItem={({ item }): ReactElement => (
                <DeviceCard
                  key={item.id}
                  device={item}
                  onPress={async (): Promise<void> => {
                    if (state?.connection !== 'isConnecting')
                      if (connected?.device?.id === item.id) disconnectFromDevice();
                      else await connectToDevice(item);
                  }}
                  state={state}
                />
              )}
            />
          </View>
        </View>
      )}
    </PrivateContainer>
  );
};
