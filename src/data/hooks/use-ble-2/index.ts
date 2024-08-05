/* eslint-disable max-lines */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-properties */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable max-depth */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import * as ExpoDevice from 'expo-device';
import { BleManager } from 'react-native-ble-plx';
import { CharacteristicType } from 'domain/enums';
import { PermissionsAndroid, Platform } from 'react-native';
import { convertCode, resolveCode } from 'main/utils';
import { useEffect, useMemo, useState } from 'react';
import Deferred from 'data/bluetooth/deferred';
import base64 from 'react-native-base64';
import decodeCharacteristicResponse from 'data/bluetooth/decode-characteristic-response';
import type { BleError, Characteristic, Device } from 'react-native-ble-plx';
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
  requestPermissions: () => Promise<boolean>;
  startScan: () => void;
  stopScan: () => void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  setCode: Dispatch<SetStateAction<CharacteristicType | null>>;
  allDevices: Device[];
  rpm: number | null;
  rawResponse: string;
  startStreaming: () => void;
  startReading: () => void;
  isScanning: boolean;
  getDeviceServicesAndCharacteristics: (deviceConnection: Device) => Promise<Array2[] | undefined>;
  state: state;
  data: Array2[];
}

export const useBle = (): BluetoothLowEnergyApi => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [code, setCode] = useState<CharacteristicType | null>(null);
  const [state, setState] = useState<state>(null);
  const [data, setData] = useState<Array2[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [rpm, setRpm] = useState<number | null>(null);

  let responseDeferred = new Deferred<BLEResponse>();
  let rawResponse = '';

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

  const setRead = (): Promise<BLEResponse> | undefined => {
    if (code)
      try {
        connectedDevice?.writeCharacteristicWithoutResponseForService(
          SERVICE_UUID,
          WRITE_CHARACTERISTIC,
          base64.encode(code)
        );

        responseDeferred = new Deferred<BLEResponse>();
        return responseDeferred.promise;
      } catch (error) {
        console.log('FAILED TO send signal', error);
      }

    return undefined;
  };

  const onResponseUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ): string | undefined => {
    if (error) {
      console.log(error);
      return 'No response';
    }
    if (!characteristic?.value) {
      console.log('No Data was received');
      return 'No Data was received';
    }
    if (code === null) {
      console.log('No Code');
      return 'No Code';
    }

    const decodedData = base64.decode(characteristic.value);

    rawResponse += decodedData;

    // Every message from the device ends with '>', so look for that, then process it
    if (decodedData.substring(decodedData.length - 1) === '>') {
      const decodedResponse = decodeCharacteristicResponse(code, rawResponse);

      responseDeferred.resolve({
        decoded: decodedResponse,
        raw: rawResponse
      });
    }
  };

  const startStreaming = (): void => {
    console.log('nada');
    if (connectedDevice)
      connectedDevice.monitorCharacteristicForService(
        SERVICE_UUID,
        READ_CHARACTERISTIC,
        onResponseUpdate
      );
  };

  useEffect(() => {
    setRead();
  }, [code]);

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

        const deviceConnection = await bleManager.connectToDevice(device.id);

        const newDeviceConnection = await deviceConnection.discoverAllServicesAndCharacteristics();

        const AUTH_COMMAND = base64.encode('AUTH 1234');

        console.log(AUTH_COMMAND);

        await newDeviceConnection?.writeCharacteristicWithoutResponseForService(
          SERVICE_UUID,
          WRITE_CHARACTERISTIC,
          AUTH_COMMAND
        );

        newDeviceConnection.monitorCharacteristicForService(
          SERVICE_UUID,
          READ_CHARACTERISTIC,
          (error, characteristic2) => {
            if (error) {
              console.error(error);
              return;
            }
            const data2 = characteristic2?.value;
            const aaa = base64.decode(data2 ?? '');

            console.log(aaa);

            // Analisar a resposta para verificar se a autenticação foi bem-sucedida
            if (data2 === 'AUTH_SUCCESS') console.log('Autenticação bem-sucedida');
            else console.error('Falha na autenticação');
          }
        );

        setConnectedDevice(newDeviceConnection);

        bleManager.stopDeviceScan();
        setIsScanning(false);
        setState({ connection: 'isConnected', device });
      } catch (error) {
        setState({ connection: 'notConnected', device });
        console.log('FAILED TO CONNECT', error);
      }
  };

  const startReading = async (): Promise<void> => {
    try {
      const rpmCommand = base64.encode(CharacteristicType.engineSpeed);

      await connectedDevice?.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        WRITE_CHARACTERISTIC,
        rpmCommand
      );
      let aaa = 1;

      // Monitorar a característica para obter a resposta
      connectedDevice?.monitorCharacteristicForService(
        SERVICE_UUID,
        READ_CHARACTERISTIC,
        (error, characteristic) => {
          if (error) {
            console.warn(error);
            return;
          }

          const base64Value = characteristic?.value;

          console.log(`${aaa} Base64 value:`, base64Value);
          const decodedBytes = base64.decode(base64Value ?? '');

          console.log(`${aaa} Decoded bytes:`, decodedBytes);
          const rawValue = decodedBytes
            .split('')
            .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('');

          console.log(`${aaa} Raw hex value:`, rawValue);
          aaa += 1;

          // // Tratar mensagens de erro ou status
          // if (rawValue.includes('53454152')) {
          //   console.error('Search error. Check device status and command format.');
          //   return;
          // }
          // if (rawValue.includes('434849')) {
          //   console.error('Communication error. Check device connection.');
          //   return;
          // }
          // if (rawValue.includes('4e472e')) {
          //   console.error('Error message received. Check command and connection.');
          //   return;
          // }
          // if (rawValue.startsWith('410C')) {
          //   const first = parseInt(rawValue.substring(4, 6), 16);
          //   const second = parseInt(rawValue.substring(6, 8), 16);
          //   const newRpm = (first * 256 + second) / 4;

          //   setRpm(newRpm);
          // } else console.warn('Unexpected data received:', rawValue);
        }
      );
    } catch (error) {
      console.warn('Error in authentication or reading:', error);
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
      setRpm(0);
    }
  };

  return {
    allDevices,
    connectToDevice,
    connectedDevice,
    data,
    disconnectFromDevice,
    getDeviceServicesAndCharacteristics,
    isScanning,
    rawResponse,
    requestPermissions,
    rpm,
    setCode,
    startReading,
    startScan,
    startStreaming,
    state,
    stopScan
  };
};
