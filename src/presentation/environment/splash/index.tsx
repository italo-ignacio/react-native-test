import { BleManager } from 'react-native-ble-plx';
import { type FC, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import type { Device } from 'react-native-ble-plx';

export const SplashScreen: FC = () => {
  const [test, setTest] = useState<Device[]>([]);

  const startScan = (): void => {
    const manager = new BleManager();
    const devices: Device[] = [];

    manager.startDeviceScan(null, null, (error, device: Device | null) => {
      if (error !== null) {
        console.error(error);
        return;
      }
      if (device && !devices.find((item) => item.id === device.id)) devices.push(device);
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      setTest(devices);
    }, 20000);
  };

  return (
    <SafeAreaView className={'flex w-full h-screen justify-center items-center'}>
      <TouchableOpacity
        activeOpacity={0.5}
        className={'bg-primary text-white p-2 rounded-md'}
        onPress={startScan}
      >
        <Text>Scan Bluetooth Devices</Text>
      </TouchableOpacity>

      <View className={'flex flex-col gap-3'}>
        {test.map((item) => (
          <Text key={item.id}>{item.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};
