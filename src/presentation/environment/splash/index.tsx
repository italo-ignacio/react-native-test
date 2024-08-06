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
import { CharacteristicSelectValues } from 'domain/enums';
import { Container } from 'presentation/atomic-component/atom';
import { type FC, type ReactNode, useState } from 'react';
import { useBle } from 'data/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { CharacteristicValues } from 'domain/enums';
import type { Device } from 'react-native-ble-plx';

export const SplashScreen: FC = () => {
  const [selectedItems, setSelectedItems] = useState<{ label: string; value: string }[]>([]);
  const [data, setData] = useState<{ [key in CharacteristicValues]?: number | string | null }>({});

  const {
    allDevices,
    startScan,
    connectedDevice,
    isScanning,
    disconnectFromDevice,
    stopScan,
    connectToDevice,
    state
  } = useBle({ selectedItems, setData });

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
                <TouchableOpacity
                  className={`shadow-md p-3 rounded-md border border-gray-300 ${
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
              )}
            />
          </View>
        </View>
      </Modal>

      <View className={'flex flex-row flex-wrap mt-8 mx-auto'} style={{ gap: 6 }}>
        {selectedItems.map((item) => (
          <TouchableOpacity
            key={item.value}
            activeOpacity={0}
            className={'p-4 rounded-md border justify-between flex flex-col bg-primary w-[45vw]'}
            style={{ gap: 16 }}
          >
            <Text className={'text-white text-center'} ellipsizeMode={'tail'} numberOfLines={2}>
              {item.label}
            </Text>

            {data[item.value as unknown as CharacteristicValues] ? (
              <Text className={'text-white text-center font-black'}>
                {data[item.value as unknown as CharacteristicValues]}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};
