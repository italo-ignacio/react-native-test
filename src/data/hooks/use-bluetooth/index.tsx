/* eslint-disable no-return-await */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable consistent-return */
/* eslint-disable max-lines-per-function */
import * as ExpoDevice from 'expo-device';
import { BleManager, State } from 'react-native-ble-plx';
import { CharacteristicType } from 'domain/enums';
import { PermissionsAndroid, Platform } from 'react-native';
import { convertOBDResponseToVIN } from 'main/utils';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRequest } from '../use-request';
import base64 from 'react-native-base64';
import decodeCharacteristicResponse from 'data/bluetooth/decode-characteristic-response';
import type { BleError, Characteristic, Device, Subscription } from 'react-native-ble-plx';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { Vehicle } from 'domain/models';

const SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const READ_CHARACTERISTIC = '0000fff1-0000-1000-8000-00805f9b34fb';
const WRITE_CHARACTERISTIC = '0000fff2-0000-1000-8000-00805f9b34fb';

interface BluetoothProviderProps {
  children: ReactNode;
}

export type stateDevice = {
  connection: 'isConnected' | 'isConnecting' | 'notConnected';
  device: Device;
} | null;

export interface connectedData {
  device: Device | null;
  vehicle: Vehicle | null;
  vin?: string;
}

interface BluetoothContextProps {
  startScan: () => void;
  stopScan: () => void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  writeInObd: (
    code: CharacteristicType,
    device?: Device | null
  ) => Promise<Characteristic | undefined>;
  disconnectFromDevice: () => void;
  requestPermissions: () => Promise<boolean>;
  allDevices: Device[];
  connected: connectedData;
  isScanning: boolean;
  isMonitoring: boolean;
  setIsMonitoring: Dispatch<SetStateAction<boolean>>;
  state: stateDevice;
  bluetoothState: 'off' | 'on';
  startMonitor: (code: CharacteristicType) => Promise<void>;
  stopMonitor: (code: CharacteristicType | 'all') => void;
}

const BluetoothContext = createContext<BluetoothContextProps>({} as BluetoothContextProps);

export const useBluetooth = (): BluetoothContextProps => {
  return useContext(BluetoothContext);
};

export const BluetoothProvider = ({ children }: BluetoothProviderProps): ReactNode => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [bluetoothState, setBluetoothState] = useState<'off' | 'on'>('off');
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [state, setState] = useState<stateDevice>(null);
  const [connected, setConnected] = useState<connectedData>({ device: null, vehicle: null });
  const { findRequest } = useRequest();

  useEffect(() => {
    const subscription = bleManager.onStateChange((value) => {
      if (value === State.PoweredOn) setBluetoothState('on');
      else {
        setBluetoothState('off');
        setAllDevices([]);
        setIsScanning(false);
        setIsMonitoring(false);
        setState(null);
        setConnected({ device: null, vehicle: null });
      }
    }, true);

    return () => {
      subscription.remove();
    };
  }, [bleManager]);

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

    // eslint-disable-next-line no-extra-parens
    if ((await bleManager.state()) === State.PoweredOn && isPermissionsEnabled && !isScanning) {
      setIsScanning(true);
      await bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) console.error('scan error: ', error);

        if (device?.name)
          setAllDevices((prevState: Device[]) => {
            if (isDuplicatedDevice(prevState, device)) return prevState;

            if (device.name?.toLowerCase()?.includes('obd')) return [device, ...prevState];

            return [...prevState, device];
          });
      });
    }
  };

  let characteristicMonitoring: {
    [key in CharacteristicType]?: {
      characteristic: Characteristic;
      monitor: Subscription;
    };
  } = {};

  const startMonitor = async (code: CharacteristicType): Promise<void> => {
    const oldCharacteristic = characteristicMonitoring[code]?.characteristic;

    console.log('aaaa');

    if (oldCharacteristic) await oldCharacteristic.writeWithoutResponse(base64.encode(code));
    else {
      const characteristic = await connected?.device?.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        READ_CHARACTERISTIC,
        base64.encode(code)
      );

      console.log(characteristic);

      const monitor = characteristic?.monitor(
        (error: BleError | null, characteristicMonitor: Characteristic | null) => {
          if (error) {
            console.error(error);
            return 'No response';
          }

          const value = base64.decode(characteristicMonitor?.value ?? '');

          const decodedValue = decodeCharacteristicResponse(code, value);

          console.log({ decodedValue, value });

          // if (data[code] !== value && value !== undefined && value !== null)
          //   setData((prevState) => ({
          //     ...prevState,
          //     [code]: value
          //   }));
        }
      );

      characteristicMonitoring = {
        ...characteristicMonitoring,
        [code]: { characteristic, monitor }
      };
    }
  };

  const stopMonitor = (code: CharacteristicType | 'all'): void => {
    if (code === 'all')
      for (const element of Object.values(characteristicMonitoring)) {
        const oldCharacteristic = element.monitor;

        oldCharacteristic?.remove();

        characteristicMonitoring = {};
      }
    else {
      const oldCharacteristic = characteristicMonitoring[code]?.monitor;

      oldCharacteristic?.remove();

      characteristicMonitoring = {
        ...characteristicMonitoring,
        [code]: undefined
      };
    }
  };

  const writeInObd = async (
    code: CharacteristicType,
    device?: Device | null
  ): Promise<Characteristic | undefined> => {
    if (device)
      return await device?.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        READ_CHARACTERISTIC,
        base64.encode(code)
      );

    if (connected)
      return await connected.device?.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        READ_CHARACTERISTIC,
        base64.encode(code)
      );

    return undefined;

    // const newCharacteristic =
    //   await connected.device?.writeCharacteristicWithoutResponseForService(
    //     SERVICE_UUID,
    //     READ_CHARACTERISTIC,
    //     base64.encode(code)
    //   );

    // const sub = newCharacteristic?.monitor(
    //   (error: BleError | null, characteristicMonitor: Characteristic | null) => {
    //     if (error) {
    //       console.error(error);
    //       return 'No response';
    //     }

    //     const decodedValue = base64.decode(characteristicMonitor?.value ?? '');

    //     const value = decodeCharacteristicResponse(code, decodedValue);

    //     console.log({ decodedValue, value });

    //     setTimeout(() => {
    //       sub?.remove();
    //     }, 2000);
    //   }
    // );
  };

  const finishConnection = async (
    vinData: { line1: string; line2: string },
    device: Device,
    subscription: Subscription
  ): Promise<void> => {
    try {
      subscription.remove();
      const vin = convertOBDResponseToVIN(vinData);

      const vehicle = await findRequest<Vehicle | undefined>({
        apiRoute: '/vehicle/my',
        limit: 1,
        page: 1,
        params: { search: vin },
        route: 'vehicle'
      });

      if (vehicle) setConnected({ device, vehicle, vin });
      else setConnected({ device, vehicle: null, vin });

      await bleManager.stopDeviceScan();
      setIsScanning(false);
      setState({ connection: 'isConnected', device });
    } catch (error) {
      setState({ connection: 'notConnected', device });
      setConnected({ device: null, vehicle: null });
      console.error('failed to connect', error);
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

        const characteristic =
          await newDeviceConnection?.writeCharacteristicWithoutResponseForService(
            SERVICE_UUID,
            READ_CHARACTERISTIC,
            base64.encode(CharacteristicType.vin)
          );

        // eslint-disable-next-line prefer-const
        let vinData = { line1: '', line2: '' };

        const subscription = characteristic?.monitor(
          (error: BleError | null, characteristicMonitor: Characteristic | null) => {
            if (error) {
              console.error(error);
              return 'No response';
            }

            const value = base64.decode(characteristicMonitor?.value ?? '');

            if (value?.startsWith('1:'))
              Object.assign(vinData, { ...vinData, line1: value.slice(3) });
            else if (value?.startsWith('2:'))
              Object.assign(vinData, { ...vinData, line2: value.slice(3) });

            if (vinData.line1.length > 0 && vinData.line2.length > 0)
              finishConnection(vinData, newDeviceConnection, subscription);
          }
        );
      } catch (error) {
        setState({ connection: 'notConnected', device });
        setConnected({ device: null, vehicle: null });
        console.error('failed to connect', error);
      }
  };

  const stopScan = async (): Promise<void> => {
    await bleManager.stopDeviceScan();
    setIsScanning(false);
  };

  const disconnectFromDevice = (): void => {
    if (connected.device) {
      bleManager.cancelDeviceConnection(connected.device.id);
      setConnected({ device: null, vehicle: null });
      setState(null);
    }
  };

  const value = useMemo(
    () => ({
      allDevices,
      bluetoothState,
      connectToDevice,
      connected,
      disconnectFromDevice,
      isMonitoring,
      isScanning,
      requestPermissions,
      setIsMonitoring,
      startMonitor,
      startScan,
      state,
      stopMonitor,
      stopScan,
      writeInObd
    }),
    [
      allDevices,
      connectToDevice,
      disconnectFromDevice,
      connected,
      bluetoothState,
      isMonitoring,
      startMonitor,
      stopMonitor,
      isScanning,
      writeInObd,
      requestPermissions,
      setIsMonitoring,
      startScan,
      state,
      stopScan
    ]
  );

  return <BluetoothContext.Provider value={value}>{children}</BluetoothContext.Provider>;
};
