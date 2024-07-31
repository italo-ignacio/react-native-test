import { BleManager } from 'react-native-ble-plx';
import { Button, Text, View } from 'react-native';
import { Container } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import type { Device } from 'react-native-ble-plx';

export const SplashScreen: FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const getUniqueDevices = (devices2: Device[]): Device[] => {
    const deviceIds = new Set<string>();

    return devices2.filter((device) => {
      if (deviceIds.has(device.id)) return false;

      deviceIds.add(device.id);
      return true;
    });
  };

  const startScan = (): void => {
    console.log('Start scan');
    if (!isSearching) {
      setIsSearching(true);

      const manager = new BleManager();

      const newDevices: Device[] = [];

      const interval = 2000;
      const totalDuration = 20000;

      const setData = (): void => {
        setDevices(getUniqueDevices(newDevices));
      };
      const intervalId = setInterval(setData, interval);

      manager.startDeviceScan(null, null, (error, device: Device | null) => {
        console.log(error, device);

        if (error !== null) {
          console.error(error);
          return;
        }
        if (error === null && device) newDevices.push(device);
      });

      setTimeout(() => {
        clearInterval(intervalId);
      }, totalDuration);

      setTimeout(() => {
        manager.stopDeviceScan();
        setIsSearching(false);
      }, 25000);
    }
  };

  return (
    <Container>
      <Button
        disabled={isSearching}
        onPress={startScan}
        title={isSearching ? 'Buscando ...' : 'Buscar dispositivos'}
      />

      <Button
        onPress={(): void => {
          console.log(devices[0]);
        }}
        title={'Ver'}
      />

      <View className={'flex flex-col bg-primary'}>
        {devices.map((item) => (
          <Text key={item.id} className={'mt-3'}>
            {item.name} dsadsa
          </Text>
        ))}
      </View>
    </Container>
  );
};
