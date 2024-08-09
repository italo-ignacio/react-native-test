/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CharacteristicSelectValues, CharacteristicType } from 'domain/enums';
import { Container } from 'presentation/atomic-component/atom';
import { type FC, type ReactNode, useState } from 'react';
import { useBle } from 'data/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { Device } from 'react-native-ble-plx';

export const Ble: FC = () => {
  const [selectedItems, setSelectedItems] = useState<
    { label: string; value: CharacteristicType }[]
  >([
    { label: 'Velocidade do Motor', value: CharacteristicType.engineSpeed },
    { label: 'Taxa de Combustível do Motor', value: CharacteristicType.engineFuelRate },
    { label: 'Taxa de Fluxo de Ar MAF', value: CharacteristicType.mafAirFlowRate },
    { label: 'Tipo de Combustível', value: CharacteristicType.fuelType },
    { label: 'Odometro', value: CharacteristicType.odometer },
    { label: 'Nível de Combustível do Tanque', value: CharacteristicType.fuelTankLevelInput }
  ]);

  const [data, setData] = useState<{
    [key in CharacteristicType]?: number | string | null;
  }>({});

  const {
    allDevices,
    startScan,
    setIsMonitoring,
    logVehicleData,
    connectedDevice,
    isMonitoring,
    isScanning,
    disconnectFromDevice,
    stopScan,
    connectToDevice,
    state
  } = useBle({ data, selectedItems, setData });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
        onPress={(): void => setIsDropdownVisible(!isDropdownVisible)}
        title={isDropdownVisible ? 'Fechar Seleção' : 'Abrir Seleção'}
      />

      <Modal visible={isDropdownVisible}>
        <View className={'h-[70vh] w-[70vw] m-auto mt-[20%]'}>
          <TouchableOpacity
            className={'flex items-end'}
            onPress={(): void => setIsDropdownVisible(!isDropdownVisible)}
          >
            <Text className={'text-2xl p-3'}>X</Text>
          </TouchableOpacity>

          <View>
            <FlatList
              contentContainerStyle={{ gap: 10, paddingHorizontal: 6 }}
              data={CharacteristicSelectValues}
              keyExtractor={(item): string => item.value}
              renderItem={({ item }): any => (
                <View className={'flex flex-row'} style={{ gap: 8 }}>
                  <TouchableOpacity
                    className={`shadow-md p-3 rounded-md border w-[60%] border-gray-300 ${
                      selectedItems.find((list) => list.value === item.value)
                        ? 'bg-success'
                        : 'bg-gray-300'
                    }`}
                    onPress={(): void => {
                      const oldSelectedItems = [...selectedItems];

                      if (oldSelectedItems.find((seItem) => item.value === seItem.value))
                        setSelectedItems(
                          oldSelectedItems.filter((seItem) => seItem.value !== item.value)
                        );
                      else setSelectedItems([...oldSelectedItems, item]);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={
                      'shadow-md p-3 flex justify-center rounded-md border border-gray-300'
                    }
                    onPress={(): void => {
                      logVehicleData(item.value);
                    }}
                  >
                    <Text>VER LOG</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

      <Button
        onPress={(): void => setIsMonitoring((old) => !old)}
        title={isMonitoring ? 'Monitorando...' : 'Iniciar leitura'}
      />

      <View className={'flex flex-row flex-wrap mt-8 mx-auto'} style={{ gap: 6 }}>
        {selectedItems.map((item) => (
          <TouchableOpacity
            key={item.value}
            activeOpacity={1}
            className={'p-4 rounded-md border justify-between flex flex-col bg-primary w-[45vw]'}
            style={{ gap: 16 }}
          >
            <Text className={'text-white text-center'} ellipsizeMode={'tail'} numberOfLines={2}>
              {item.label}
            </Text>

            {data[item.value as unknown as CharacteristicType] !== null ||
            data[item.value as unknown as CharacteristicType] !== undefined ? (
              <Text className={'text-white text-center font-black'}>
                {JSON.stringify(data[item.value as unknown as CharacteristicType])}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};
