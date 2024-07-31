/* eslint-disable max-lines-per-function */
import * as ExpoDevice from 'expo-device';
import { BleManager } from 'react-native-ble-plx';
import { CharacteristicType } from 'domain/enums';
import { PermissionsAndroid, Platform } from 'react-native';
import { useMemo, useState } from 'react';
import Deferred from 'data/bluetooth/deferred';
import base64 from 'react-native-base64';
import decodeCharacteristicResponse from 'data/bluetooth/decode-characteristic-response';
import type { BleError, Characteristic, Device } from 'react-native-ble-plx';

const SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';

// const WRITE_CHARACTERISTIC = '0000fff2-0000-1000-8000-00805f9b34fb';
const READ_CHARACTERISTIC = '0000fff1-0000-1000-8000-00805f9b34fb';

type state = {
  connection: 'isConnected' | 'isConnecting' | 'notConnected';
  device: Device;
} | null;

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
  state: state;
}

interface BLEResponse {
  raw: string;
  decoded: unknown;
}

export const useBle = (): BluetoothLowEnergyApi => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [state, setState] = useState<state>(null);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);

  const responseDeferred = new Deferred<BLEResponse | undefined>();

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

  const onObdChangeUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
    // eslint-disable-next-line consistent-return
  ): string | undefined => {
    console.log(error, characteristic);

    if (error) {
      console.log(error);
      return 'No response';
    }
    if (!characteristic?.value) {
      console.log('No Data was received');
      return 'No Data was received';
    }
    let rawResponse = '';
    const decodedData = base64.decode(characteristic.value);

    rawResponse += decodedData;

    // Every message from the device ends with '>', so look for that, then process it
    // eslint-disable-next-line no-restricted-properties
    if (decodedData.substring(decodedData.length - 1) === '>') {
      const decodedResponse = decodeCharacteristicResponse(
        CharacteristicType.engineSpeed,
        rawResponse
      );

      console.log(decodedResponse);

      /*
       * if (responseDeferred)
       *   responseDeferred.resolve?.({
       *     decoded: decodedResponse,
       *     raw: rawResponse
       *   });
       */
    }
    console.log(rawResponse);
  };

  const startStreamingData = (device: Device): void => {
    if (device)
      device.monitorCharacteristicForService(SERVICE_UUID, READ_CHARACTERISTIC, onObdChangeUpdate);
    else console.log('No Device Connected');
  };

  const connectToDevice = async (device: Device): Promise<void> => {
    if (state?.connection !== 'isConnecting')
      try {
        setState({ connection: 'isConnecting', device });
        const deviceConnection = await bleManager.connectToDevice(device.id, {
          autoConnect: true
        });

        console.log(deviceConnection);

        console.log(await deviceConnection.isConnected());

        setConnectedDevice(deviceConnection);
        const discovery = await deviceConnection.discoverAllServicesAndCharacteristics();
        const services = await discovery.services();

        services.forEach((item) => {
          // console.log(item);
        });

        bleManager.stopDeviceScan();
        setIsScanning(false);
        setState({ connection: 'isConnected', device });

        startStreamingData(deviceConnection);
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
      setHeartRate(0);
    }
  };

  return {
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    heartRate,
    isScanning,
    requestPermissions,
    startScan,
    state,
    stopScan
  };
};
