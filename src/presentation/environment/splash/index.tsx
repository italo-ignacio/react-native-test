/* eslint-disable react/no-array-index-key */
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from 'react-native';
import { CharacteristicConst, CharacteristicType } from 'domain/enums';
import { Container } from 'presentation/atomic-component/atom';
import { type FC, type ReactNode, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { colors } from 'presentation/style';
import { useBle } from 'data/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { Device } from 'react-native-ble-plx';

export const SplashScreen: FC = () => {
  const {
    allDevices,
    startScan,
    connectedDevice,
    isScanning,
    startReading,
    rpm,
    startMonitor,
    setCode,
    disconnectFromDevice,
    stopScan,
    connectToDevice,
    state
  } = useBle();

  const [selectedValue, setSelectedValue] = useState<CharacteristicType | null>(
    CharacteristicType.engineSpeed
  );

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
        {allDevices.length > 0 ? (
          <Text className={'text-center text-2xl mb-3 font-semibold'}>Lista de Devices</Text>
        ) : null}

        {allDevices.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.5}
            className={'bg-gray-200 shadow-md p-3 rounded-md border border-gray-300'}
            onPress={(): void => {
              if (connectedDevice?.id === item.id) disconnectFromDevice();
              else connectToDevice(item);
            }}
          >
            <View className={'flex flex-row justify-between'}>
              <Text>{item.name}</Text>
              {getItemState(item)}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        onPress={(): void => {
          startMonitor();

          // if (selectedValue) {
          //   const decode = decodeCharacteristicResponse(selectedValue, '');

          //   console.info(decode);
          // }
        }}
        title={'Printar'}
      />

      <View className={'flex flex-col mt-8'} style={{ gap: 6 }}>
        {connectedDevice ? (
          <>
            <Text className={'text-center text-2xl mb-3 font-semibold'}>Lista de Servicos</Text>

            <Picker
              onValueChange={(itemValue): void => {
                setSelectedValue(itemValue);
                setCode(itemValue as unknown as CharacteristicType);
              }}
              selectedValue={selectedValue}
              style={{
                backgroundColor: colors.gray[300]
              }}
            >
              {Object.entries(CharacteristicConst).map(([, { name, code }]) => (
                <Picker.Item key={code} label={name} value={code} />
              ))}
            </Picker>

            <TouchableOpacity
              activeOpacity={0.5}
              className={'bg-gray-500 shadow-md p-3 rounded-md border border-gray-300'}
              onPress={(): void => {
                if (selectedValue) startReading(selectedValue);
              }}
            >
              <Text>Comecar rodar</Text>
            </TouchableOpacity>

            {rpm ? (
              <TouchableOpacity
                activeOpacity={0.5}
                className={'bg-gray-300 shadow-md p-3 rounded-md border border-gray-500'}
              >
                <Text>rpm: {rpm}</Text>
              </TouchableOpacity>
            ) : null}
          </>
        ) : null}
      </View>
    </Container>
  );
};
