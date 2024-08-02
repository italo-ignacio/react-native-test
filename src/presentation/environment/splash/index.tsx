/* eslint-disable react/no-array-index-key */
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from 'react-native';
import { CharacteristicConst, CharacteristicType } from 'domain/enums';
import { Container } from 'presentation/atomic-component/atom';
import { EngineSpeedDecoder } from 'data/bluetooth';
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

    // getDeviceServicesAndCharacteristics,
    // rawResponse,
    isScanning,
    startReading,
    rpm,

    // data,
    setCode,

    // startStreaming,
    disconnectFromDevice,
    stopScan,
    connectToDevice,
    state
  } = useBle();

  // const [searchingServices, setSearchingServices] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
          const decode = new EngineSpeedDecoder('41 0C 2c 70');

          console.log(decode.decode());
        }}
        title={'aa'}
      />

      {/* <View className={'flex flex-col mt-8'} style={{ gap: 6 }}>
        {connectedDevice ? (
          <>
            <Text className={'text-center text-2xl mb-3 font-semibold'}>
              {connectedDevice.name} - Conectado
            </Text>

            <TouchableOpacity
              activeOpacity={0.5}
              className={'bg-gray-200 shadow-md p-3 rounded-md border border-gray-300'}
              disabled={searchingServices}
              onPress={async (): Promise<void> => {
                try {
                  setSearchingServices(true);
                  await getDeviceServicesAndCharacteristics(connectedDevice);
                } catch (error) {
                  console.log(error);
                } finally {
                  setSearchingServices(false);
                }
              }}
            >
              <Text>{searchingServices ? 'Buscando servicos...' : 'Buscar Servicos'}</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View> */}

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
              {Object.keys(CharacteristicConst).map((key) => (
                <Picker.Item
                  key={CharacteristicType[key as keyof typeof CharacteristicType]}
                  label={key}
                  value={CharacteristicType[key as keyof typeof CharacteristicType]}
                />
              ))}
            </Picker>

            <TouchableOpacity
              activeOpacity={0.5}
              className={'bg-gray-500 shadow-md p-3 rounded-md border border-gray-300'}
              onPress={startReading}
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
