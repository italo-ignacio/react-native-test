/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import { ActivityIndicator, Image, ImageBackground } from 'react-native';
import { CharacteristicType } from 'domain/enums';
import { type FC, type ReactNode, useState } from 'react';
import { Icon, SplashBackground } from 'assets';
import { useBle } from 'data/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { Device } from 'react-native-ble-plx';

export const SplashScreen: FC = () => {
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
    <ImageBackground
      source={SplashBackground}
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <Image alt={'Logo SGJD'} source={Icon} />
    </ImageBackground>
  );
};
