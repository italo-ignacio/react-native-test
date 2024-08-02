/* eslint-disable max-depth */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import * as ExpoDevice from 'expo-device';
import { BleManager } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { convertCode, resolveCode } from 'main/utils';
import { useMemo, useState } from 'react';
import type { Device } from 'react-native-ble-plx';

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
  requestPermissions: () => Promise<boolean>;
  startScan: () => void;
  stopScan: () => void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  heartRate: number;
  isScanning: boolean;
  getDeviceServicesAndCharacteristics: (deviceConnection: Device) => Promise<Array2[] | undefined>;
  state: state;
  data: Array2[];
}

export const useBle = (): BluetoothLowEnergyApi => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [state, setState] = useState<state>(null);
  const [data, setData] = useState<Array2[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);

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
        if (error) console.log(error);

        if (device?.name)
          setAllDevices((prevState: Device[]) => {
            if (!isDuplicatedDevice(prevState, device)) return [...prevState, device];

            return prevState;
          });
      });
    }
  };

  const getDeviceServicesAndCharacteristics = async (
    deviceConnection: Device
  ): Promise<Array2[] | undefined> => {
    try {
      const services = await deviceConnection.services();

      const newData: Array2[] = [];
      const newData2: unknown[] = [];

      for await (const service of services) {
        const characteristic2 = await deviceConnection.characteristicsForService(service.uuid);

        for await (const char of characteristic2) {
          newData2.push({
            characteristic: characteristic2,
            service
          });
          console.log(char.isReadable);

          if (char.isReadable && char.uuid === convertCode('2a19')) {
            console.log('leu');

            try {
              const characteristicValue = await char.read();

              console.log('leu tudo');

              const decodedValue2 = atob(characteristicValue?.value ?? '');

              const formattedValue2 = decodedValue2?.charCodeAt(0);

              newData.push({
                codes: {
                  characteristic: resolveCode(char.uuid),
                  service: resolveCode(service.uuid)
                },
                formattedValue: formattedValue2,
                value: characteristicValue?.value
              });
            } catch (error) {
              console.log(`leu deu error ${error}`);
            }
          }
        }
      }

      setData(newData);
      return newData;
    } catch (error) {
      console.log('Failed to start streaming data:', error);
    }

    return undefined;
  };

  const connectToDevice = async (device: Device): Promise<void> => {
    if (state?.connection !== 'isConnecting')
      try {
        setState({ connection: 'isConnecting', device });

        const deviceConnection = await bleManager.connectToDevice(device.id, {});

        await deviceConnection.discoverAllServicesAndCharacteristics();

        // await newDeviceConnection.writeCharacteristicWithResponseForService(
        //   convertCode('fff0'),
        //   convertCode('fff2'),
        //   'NTUxMDQ5MjMzNA=='
        // );

        setConnectedDevice(deviceConnection);

        setIsScanning(false);
        setState({ connection: 'isConnected', device });
      } catch (error) {
        setState({ connection: 'notConnected', device });
        console.log('FAILED TO CONNECT', error);
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
      setData([]);
      setHeartRate(0);
    }
  };

  return {
    allDevices,
    connectToDevice,
    connectedDevice,
    data,
    disconnectFromDevice,
    getDeviceServicesAndCharacteristics,
    heartRate,
    isScanning,
    requestPermissions,
    startScan,
    state,
    stopScan
  };
};
