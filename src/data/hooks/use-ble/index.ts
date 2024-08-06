/* eslint-disable consistent-return */
/* eslint-disable max-lines-per-function */
import * as ExpoDevice from 'expo-device';
import { BleManager } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { useMemo, useState } from 'react';
import base64 from 'react-native-base64';
import type { BleError, Characteristic, Device } from 'react-native-ble-plx';
import type { CharacteristicType, CharacteristicValues } from 'domain/enums';
import type { Dispatch, SetStateAction } from 'react';

const SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const READ_CHARACTERISTIC = '0000fff1-0000-1000-8000-00805f9b34fb';
const WRITE_CHARACTERISTIC = '0000fff2-0000-1000-8000-00805f9b34fb';

export interface BLEResponse {
  raw: unknown;
  decoded: unknown;
}

type state = {
  connection: 'isConnected' | 'isConnecting' | 'notConnected';
  device: Device;
} | null;

export interface Array2 {
  codes: {
    service: string;
    characteristic: string;
  };
  value: unknown;
  formattedValue: unknown;
}

interface BluetoothLowEnergyApi {
  startScan: () => void;
  stopScan: () => void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  requestPermissions: () => Promise<boolean>;
  readCharacteristic: (characteristicToFind: CharacteristicType) => void;
  allDevices: Device[];
  connectedDevice: Device | null;
  isScanning: boolean;
  state: state;
}

export const useBle = ({
  selectedItems,
  setData
}: {
  selectedItems: { label: string; value: string }[];
  setData: Dispatch<SetStateAction<{ [key in CharacteristicValues]?: number | string | null }>>;
}): BluetoothLowEnergyApi => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [state, setState] = useState<state>(null);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const requestAndroid31Permissions = async (): Promise<boolean> => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        buttonPositive: 'OK',
        message: 'Bluetooth Low Energy requires Location',
        title: 'Location Permission'
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        buttonPositive: 'OK',
        message: 'Bluetooth Low Energy requires Location',
        title: 'Location Permission'
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        buttonPositive: 'OK',
        message: 'Bluetooth Low Energy requires Location',
        title: 'Location Permission'
      }
    );

    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothConnectPermission === 'granted' &&
      fineLocationPermission === 'granted'
    );
  };

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            buttonPositive: 'OK',
            message: 'Bluetooth Low Energy requires Location',
            title: 'Location Permission'
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

      return isAndroid31PermissionsGranted;
    }
    return true;
  };

  const isDuplicatedDevice = (devices: Device[], nextDevice: Device): boolean =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const startScan = async (): Promise<void> => {
    const isPermissionsEnabled = await requestPermissions();

    if (isPermissionsEnabled) {
      setIsScanning(true);
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) console.error('scan error: ', error);

        if (device?.name)
          setAllDevices((prevState: Device[]) => {
            if (!isDuplicatedDevice(prevState, device)) return [...prevState, device];

            return prevState;
          });
      });
    }
  };

  const onResponseUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ): string | undefined => {
    if (error) {
      console.error(error);
      return 'No response';
    }

    const decodedValue = base64.decode(characteristic?.value ?? '');

    if (decodedValue && decodedValue.length > 0 && decodedValue?.split(' ')?.[0].length === 2) {
      console.info();
      console.info('############# START MONITOR #############');
      console.info();
      console.info('Characteristic value: ', characteristic?.value);

      console.info('Decoded value: ', decodedValue);
      console.info();
      console.info('############# END MONITOR #############');

      console.info();
    }
  };

  const connectToDevice = async (device: Device): Promise<void> => {
    if (state?.connection !== 'isConnecting')
      try {
        setState({ connection: 'isConnecting', device });

        const deviceConnection = await bleManager.connectToDevice(device.id);

        const newDeviceConnection = await deviceConnection.discoverAllServicesAndCharacteristics();

        // const fiat 500 = 'ATSP7';
        // const eco sport = 'ATSP0';

        // ATZ: Reinicia o adaptador OBD2.
        // ATE0: Desliga o eco para evitar respostas duplicadas.
        // ATH0: Desliga a exibição de cabeçalhos.
        // ATL0: Desliga a exibição de linhas.
        // ATSP{number 0-9}: Define o protocolo ISO desejada.

        // ATSP0: Protocolo automático
        // ATSP1: SAE J1850 PWM (41.6 kbaud)
        // ATSP2: SAE J1850 VPW (10.4 kbaud)
        // ATSP3: ISO 9141-2 (5 baud init, 10.4 kbaud)
        // ATSP4: ISO 14230-4 KWP (5 baud init, 10.4 kbaud)
        // ATSP5: ISO 14230-4 KWP (fast init, 10.4 kbaud)
        // ATSP6: ISO 15765-4 CAN (11 bit ID, 500 kbaud)
        // ATSP7: ISO 15765-4 CAN (29 bit ID, 500 kbaud)
        // ATSP8: ISO 15765-4 CAN (11 bit ID, 250 kbaud)
        // ATSP9: ISO 15765-4 CAN (29 bit ID, 250 kbaud)

        const protocols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const protocol = protocols[0];
        const commands = ['ATZ\r', 'ATE0\r', 'ATH0\r', 'ATL0\r', `ATSP${protocol}\r`];

        for await (const command of commands)
          await newDeviceConnection.writeCharacteristicWithoutResponseForService(
            SERVICE_UUID,
            WRITE_CHARACTERISTIC,
            base64.encode(command)
          );

        newDeviceConnection.monitorCharacteristicForService(
          SERVICE_UUID,
          READ_CHARACTERISTIC,
          onResponseUpdate
        );

        setConnectedDevice(newDeviceConnection);

        bleManager.stopDeviceScan();
        setIsScanning(false);
        setState({ connection: 'isConnected', device: newDeviceConnection });
      } catch (error) {
        setState({ connection: 'notConnected', device });
        console.error('failed to connect', error);
      }
  };

  const readCharacteristic = async (characteristicToFind: CharacteristicType): Promise<void> => {
    if (connectedDevice)
      try {
        const encodedCharacteristicToFind = base64.encode(characteristicToFind);

        await connectedDevice.writeCharacteristicWithoutResponseForService(
          SERVICE_UUID,
          WRITE_CHARACTERISTIC,
          encodedCharacteristicToFind
        );
      } catch (error) {
        console.error('Reading error: ', error);
      }
  };

  const stopScan = (): void => {
    bleManager.stopDeviceScan();
    setIsScanning(false);
  };

  const disconnectFromDevice = (): void => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setState(null);
    }
  };

  return {
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    isScanning,
    readCharacteristic,
    requestPermissions,
    startScan,
    state,
    stopScan
  };
};
