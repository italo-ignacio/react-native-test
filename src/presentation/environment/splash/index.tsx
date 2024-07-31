import { ActivityIndicator, Button, Text, TouchableOpacity, View } from 'react-native';
import { Container } from 'presentation/atomic-component/atom';
import { useBle } from 'data/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { Device } from 'react-native-ble-plx';
import type { FC, ReactNode } from 'react';

export const SplashScreen: FC = () => {
  const { allDevices, startScan, isScanning, stopScan, connectToDevice, state } = useBle();

  const getItemState = (device: Device): ReactNode => {
    if (state && state?.device.id === device.id)
      switch (state.connection) {
        case 'isConnecting':
          return <ActivityIndicator size={18} />;
        case 'isConnected':
          return <MaterialIcons color={'#3396F3'} name={'bluetooth-connected'} size={18} />;
        case 'notConnected':
          return <MaterialIcons color={'red'} name={'error-outline'} size={18} />;
        default:
          return null;
      }

    if (state?.connection === 'isConnecting') return null;

    return <AntDesign color={'#3396F3'} name={'play'} size={18} />;
  };

  return (
    <Container style={{ gap: 6 }}>
      <Button
        onPress={isScanning ? stopScan : startScan}
        title={isScanning ? 'Buscando Devices ...' : 'Buscar dispositivos'}
      />

      <View className={'flex flex-col mt-8'} style={{ gap: 6 }}>
        <Text className={'text-center text-2xl mb-3 font-semibold'}>Lista de Devices</Text>

        {allDevices.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.5}
            className={'bg-gray-200 shadow-md p-3 rounded-md border border-gray-300'}
            onPress={(): void => {
              connectToDevice(item);
            }}
          >
            <View className={'flex flex-row justify-between'}>
              <Text>{item.name}</Text>
              {getItemState(item)}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};
