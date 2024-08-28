import { Button, DeviceCard } from 'presentation/atomic-component/atom';
import { type FC, useEffect } from 'react';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { Text, View } from 'react-native';
import { gap } from 'main/utils';
import { useBluetooth } from 'data/hooks';

export const Bluetooth: FC = () => {
  const {
    bluetoothState,
    requestPermissions,
    allDevices,
    connectToDevice,
    connectedDevice,
    isScanning,
    state,
    disconnectFromDevice,
    startScan,
    stopScan
  } = useBluetooth();

  useEffect(() => {
    const permission = async (): Promise<void> => {
      await requestPermissions();
    };

    permission();
  }, []);

  useEffect(() => {
    if (bluetoothState === 'on') startScan();
  }, [bluetoothState]);

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

            <Button
              leftIcon={isScanning ? 'bluetooth-searching' : 'bluetooth'}
              onPress={(): void => {
                if (isScanning) stopScan();
                else startScan();
              }}
              size={'small'}
              text={isScanning ? ' Buscando' : ' Buscar'}
            />
          </View>

          {allDevices.map((item) => (
            <DeviceCard
              key={item.id}
              device={item}
              onPress={(): void => {
                if (state?.connection !== 'isConnecting')
                  if (connectedDevice?.id === item.id) disconnectFromDevice();
                  else connectToDevice(item);
              }}
              state={state}
            />
          ))}
        </View>
      )}
    </PrivateContainer>
  );
};
