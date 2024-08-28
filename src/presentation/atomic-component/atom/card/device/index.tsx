import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from 'presentation/style';
import type { Device } from 'react-native-ble-plx';
import type { FC, ReactNode } from 'react';
import type { stateDevice } from 'data/hooks';

interface DeviceCardProps {
  device: Device;
  state: stateDevice;
  isLoading?: boolean;
  onPress: () => Promise<void> | void;
}

export const DeviceCard: FC<DeviceCardProps> = ({ device, state, isLoading, onPress }) => {
  const getState = (): ReactNode => {
    if (state && state?.device.id === device.id)
      switch (state.connection) {
        case 'isConnected':
          return (
            <View className={'flex flex-row p-1 px-1.5 rounded-full items-center bg-success'}>
              <MaterialIcons color={colors.white} name={'bluetooth-connected'} size={16} />
              <Text className={'text-white'}>Conectado</Text>
            </View>
          );
        case 'notConnected':
          return (
            <View className={'flex flex-row p-1 px-1.5 rounded-full items-center bg-red'}>
              <MaterialIcons color={colors.white} name={'bluetooth-disabled'} size={16} />
              <Text className={'text-white'}>Falha ao conectar</Text>
            </View>
          );
        case 'isConnecting':
          return (
            <View
              className={
                'flex flex-row p-1 px-1.5 rounded-full items-center bg-gray-250 text-gray-550'
              }
            >
              <ActivityIndicator color={colors.gray[550]} size={18} />
              <Text className={'text-gray-700'}> Conectando</Text>
            </View>
          );

        default:
          return null;
      }

    if (state?.connection === 'isConnecting')
      return (
        <View
          className={'flex flex-row p-1 px-1.5 rounded-full items-center bg-gray-250 text-gray-550'}
        >
          <MaterialIcons color={colors.gray[550]} name={'bluetooth'} size={16} />
          <Text className={'text-gray-700'}>Desconectado</Text>
        </View>
      );

    return (
      <View
        className={'flex flex-row p-1 px-1.5 rounded-full items-center bg-gray-250 text-gray-550'}
      >
        <MaterialIcons color={colors.gray[550]} name={'bluetooth'} size={16} />
        <Text className={'text-gray-700'}>Desconectado</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={
        'flex flex-row justify-between items-center rounded-md p-1 px-1.5 py-4 w-full bg-white border border-gray-300'
      }
      disabled={isLoading}
      onPress={onPress}
    >
      <Text className={'w-[55%]'}>{device.name}</Text>
      {getState()}
    </TouchableOpacity>
  );
};
