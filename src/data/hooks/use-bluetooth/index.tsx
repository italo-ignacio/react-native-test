/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-depth */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable prefer-const */
/* eslint-disable no-return-await */
/* eslint-disable max-lines */
/* eslint-disable consistent-return */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import * as ExpoDevice from 'expo-device';
import { BleManager, State } from 'react-native-ble-plx';
import { CharacteristicType, TableName } from 'domain/enums';
import { PermissionsAndroid, Platform } from 'react-native';
import { convertOBDResponseToVIN, sleep } from 'main/utils';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDatabase } from '../use-database';
import { useRequest } from '../use-request';
import base64 from 'react-native-base64';
import decodeCharacteristicResponse from 'data/bluetooth/decode-characteristic-response';
import type { BleError, Characteristic, Device, Subscription } from 'react-native-ble-plx';
import type { ReactNode } from 'react';
import type { Vehicle } from 'domain/models';

const SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const READ_CHARACTERISTIC = '0000fff1-0000-1000-8000-00805f9b34fb';

// const WRITE_CHARACTERISTIC = '0000fff2-0000-1000-8000-00805f9b34fb';

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
  vin: string | null;
}

interface BluetoothContextProps {
  startScan: () => void;
  stopScan: () => void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  findVehicleByVin: (vin: string, device?: Device) => Promise<void>;
  writeInObd: (
    code: CharacteristicType,
    device?: Device | null
  ) => Promise<Characteristic | undefined>;
  disconnectFromDevice: () => void;
  requestPermissions: () => Promise<boolean>;
  allDevices: Device[];
  connected: connectedData;
  isScanning: boolean;
  data: { [key in CharacteristicType]?: number | string };
  isMonitoring: boolean;
  state: stateDevice;
  bluetoothState: 'off' | 'on';
  startMonitor: () => void;
  stopMonitor: () => void;
  monitorObd: (code: CharacteristicType, timesForSend: number) => Promise<void>;
  endMonitor: (code: CharacteristicType | 'all') => void;
}

const BluetoothContext = createContext<BluetoothContextProps>({} as BluetoothContextProps);

export const useBluetooth = (): BluetoothContextProps => {
  return useContext(BluetoothContext);
};

const resetConnection = { device: null, vehicle: null, vin: null };

export const BluetoothProvider = ({ children }: BluetoothProviderProps): ReactNode => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [bluetoothState, setBluetoothState] = useState<'off' | 'on'>('off');
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [data, setData] = useState<{ [key in CharacteristicType]?: number | string }>({});
  const [isScanning, setIsScanning] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [state, setState] = useState<stateDevice>(null);
  const [connected, setConnected] = useState<connectedData>(resetConnection);
  const database = useDatabase();

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
        setConnected(resetConnection);
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

  const isDuplicatedDevice = (devices: Device[], nextDevice: Device): boolean => {
    return devices.findIndex((device) => nextDevice.id === device.id) > -1;
  };

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

  const startMonitor = (): void => {
    if (connected.device && connected.vehicle) setIsMonitoring(true);
  };

  const stopMonitor = (): void => {
    setIsMonitoring(false);
  };

  let characteristicMonitoring: {
    [key in CharacteristicType]?: {
      characteristic: Characteristic;
      monitor: Subscription;
    };
  } = {};

  const dbList: { code: CharacteristicType; value: number }[] = [];
  const toSend: { [key in CharacteristicType]?: string[] } = {};

  const monitorObd = async (code: CharacteristicType, timesForSend: number): Promise<void> => {
    const oldCharacteristic = characteristicMonitoring[code]?.characteristic;

    if (oldCharacteristic) await oldCharacteristic.writeWithoutResponse(base64.encode(code));
    else {
      const characteristic = await connected?.device?.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        READ_CHARACTERISTIC,
        base64.encode(code)
      );

      const monitor = characteristic?.monitor(
        (error: BleError | null, characteristicMonitor: Characteristic | null) => {
          if (error) {
            console.error(error);
            return 'No response';
          }

          const value = base64.decode(characteristicMonitor?.value ?? '');

          const decodedValue = decodeCharacteristicResponse(code, value);

          console.info(`Code: ${code} - Decoded: ${decodedValue} - value: ${value}`);

          if (data[code] !== decodedValue && decodedValue !== undefined && decodedValue !== null) {
            setData((prevState) => ({
              ...prevState,
              [code]: decodedValue
            }));

            toSend[code]?.push(' ');

            if (typeof timesForSend === 'number' && toSend[code]?.length === timesForSend) {
              if (code === CharacteristicType.mafAirFlowRate)
                dbList.push({
                  code,
                  value:
                    decodedValue && typeof Number(decodedValue) === 'number'
                      ? (Number(decodedValue) * 3600) / (14.7 * 710)
                      : 0
                });
              else dbList.push({ code, value: Number(decodedValue) });
              toSend[code]?.splice(0, toSend[code]?.length);
            }
          }
        }
      );

      characteristicMonitoring = {
        ...characteristicMonitoring,
        [code]: { characteristic, monitor }
      };
    }
  };

  const saveObdData = async (): Promise<void> => {
    if (dbList.length)
      try {
        await database.createMany('obd_data', {
          data: dbList
        });

        dbList.splice(0, dbList.length);
      } catch (error) {
        console.log(error);
      }
  };

  const saveAverageObdData = async (): Promise<void> => {
    const periodEnd = new Date();
    const periodStart = new Date(periodEnd.getTime() - 5 * 60 * 1000);

    const periodStartStr = periodStart.toISOString().slice(0, 19).replace('T', ' ');
    const periodEndStr = periodEnd.toISOString().slice(0, 19).replace('T', ' ');

    try {
      await database.executeSql(async (tx) => {
        const list = await tx.getAllAsync<{ value: number; code: CharacteristicType }>(
          `SELECT AVG(value) as value, code FROM ${TableName.obdData} WHERE createdAt BETWEEN "${periodStartStr}" AND "${periodEndStr}" GROUP BY code`
        );

        if (list?.length) {
          await database.createMany('obd_data_average', {
            data: list
          });
          await database.delete('obd_data');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let intervals: NodeJS.Timeout[] = [];

  const monitorCodes = [
    { code: CharacteristicType.engineSpeed, interval: 500, timesForSend: 20 },
    { code: CharacteristicType.vehicleSpeed, interval: 500, timesForSend: 20 },
    { code: CharacteristicType.engineFuelRate, interval: 5000, timesForSend: 2 },
    { code: CharacteristicType.monitorStatus, interval: 5000, timesForSend: 2 },
    { code: CharacteristicType.mafAirFlowRate, interval: 5000, timesForSend: 2 }
  ];

  useEffect(() => {
    let sendToDb: NodeJS.Timeout | number | string | undefined;
    let sendAverageToDb: NodeJS.Timeout | number | string | undefined;

    if (connected.device === null || connected.vehicle === null) setIsMonitoring(false);
    else if (isMonitoring) {
      monitorCodes.forEach(({ code, interval, timesForSend }) => {
        intervals.push(
          setInterval(() => {
            if (isMonitoring && connected.device) monitorObd(code, timesForSend);
          }, interval)
        );
      });

      sendToDb = setInterval(async () => {
        await saveObdData();
      }, 30 * 1000);

      sendAverageToDb = setInterval(async () => {
        await saveAverageObdData();
      }, 5 * 60 * 1000);
    }

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
      if (sendToDb) clearInterval(sendToDb);
      if (sendAverageToDb) clearInterval(sendAverageToDb);
    };
  }, [isMonitoring]);

  const endMonitor = (code: CharacteristicType | 'all'): void => {
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
  };

  const findVehicleByVin = async (vin: string, device?: Device): Promise<void> => {
    const vehicle = await findRequest<{ content: Vehicle[] } | undefined>({
      apiRoute: '/vehicle/my',
      limit: 1,
      page: 1,
      params: { search: vin },
      route: 'vehicle'
    });

    if (vehicle?.content?.[0])
      setConnected({ device: device ?? connected.device, vehicle: vehicle?.content?.[0], vin });
    else setConnected({ device: device ?? connected.device, vehicle: null, vin });
  };

  const finishConnection = async (
    vinData: { line1: string; line2: string },
    device: Device,
    subscription: Subscription
  ): Promise<void> => {
    try {
      const vin = convertOBDResponseToVIN(vinData);

      await findVehicleByVin(vin, device);

      await bleManager.stopDeviceScan();
      setIsScanning(false);
      setState({ connection: 'isConnected', device });
    } catch (error) {
      setState({ connection: 'notConnected', device });
      setConnected(resetConnection);
      console.error('failed to connect', error);
    }

    subscription.remove();
  };

  const connectToDevice = async (device: Device): Promise<void> => {
    if (state?.connection !== 'isConnecting')
      try {
        setState({ connection: 'isConnecting', device });

        const deviceConnection = await bleManager.connectToDevice(device.id);

        const newDeviceConnection = await deviceConnection.discoverAllServicesAndCharacteristics();

        const protocols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const protocol = protocols[0];
        const commands = ['ATZ\r', 'ATE0\r', 'ATH0\r', 'ATL0\r', `ATSP${protocol}\r`];

        const characteristic =
          await newDeviceConnection?.writeCharacteristicWithoutResponseForService(
            SERVICE_UUID,
            READ_CHARACTERISTIC,
            base64.encode(CharacteristicType.vin)
          );

        for await (const command of commands)
          await characteristic.writeWithoutResponse(base64.encode(command));

        let vinData = { line1: '', line2: '' };
        let vinReceived = false;

        const readVin = async (vinType: string): Promise<void> => {
          await characteristic?.writeWithoutResponse(base64.encode(vinType));

          const subscription = characteristic?.monitor(
            (error: BleError | null, characteristicMonitor: Characteristic | null) => {
              if (error) {
                console.error(error);
                return;
              }

              const value = base64.decode(characteristicMonitor?.value ?? '');

              console.log({ value });

              if (value?.startsWith('1:')) vinData.line1 = value.slice(3);
              else if (value?.startsWith('2:')) vinData.line2 = value.slice(3);

              if (vinData.line1.length > 0 && vinData.line2.length > 0 && !vinReceived) {
                vinReceived = true;
                finishConnection(vinData, newDeviceConnection, subscription);
              }
            }
          );

          await sleep(15000);
          subscription?.remove();
        };

        await readVin(CharacteristicType.vin);

        if (!vinReceived) await readVin(CharacteristicType.vin2);

        if (!vinReceived) {
          setState({ connection: 'notConnected', device });
          setConnected(resetConnection);
          console.error('Não foi possível obter o VIN do veículo.');
        }
      } catch (error) {
        setState({ connection: 'notConnected', device });
        setConnected(resetConnection);
        console.error('failed to connect', error);
      }
  };

  // const connectToDevice = async (device: Device): Promise<void> => {
  //   if (state?.connection !== 'isConnecting')
  //     try {
  //       setState({ connection: 'isConnecting', device });

  //       const deviceConnection = await bleManager.connectToDevice(device.id);

  //       const newDeviceConnection = await deviceConnection.discoverAllServicesAndCharacteristics();

  //       // const fiat 500 = 'ATSP7';
  //       // const eco sport = 'ATSP0';

  //       // ATZ: Reinicia o adaptador OBD2.
  //       // ATE0: Desliga o eco para evitar respostas duplicadas.
  //       // ATH0: Desliga a exibição de cabeçalhos.
  //       // ATL0: Desliga a exibição de linhas.
  //       // ATSP{number 0-9}: Define o protocolo ISO desejada.

  //       // ATSP0: Protocolo automático
  //       // ATSP1: SAE J1850 PWM (41.6 kbaud)
  //       // ATSP2: SAE J1850 VPW (10.4 kbaud)
  //       // ATSP3: ISO 9141-2 (5 baud init, 10.4 kbaud)
  //       // ATSP4: ISO 14230-4 KWP (5 baud init, 10.4 kbaud)
  //       // ATSP5: ISO 14230-4 KWP (fast init, 10.4 kbaud)
  //       // ATSP6: ISO 15765-4 CAN (11 bit ID, 500 kbaud)
  //       // ATSP7: ISO 15765-4 CAN (29 bit ID, 500 kbaud)
  //       // ATSP8: ISO 15765-4 CAN (11 bit ID, 250 kbaud)
  //       // ATSP9: ISO 15765-4 CAN (29 bit ID, 250 kbaud)

  //       const protocols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  //       const protocol = protocols[0];
  //       const commands = ['ATZ\r', 'ATE0\r', 'ATH0\r', 'ATL0\r', `ATSP${protocol}\r`];

  //       for await (const command of commands)
  //         await newDeviceConnection.writeCharacteristicWithoutResponseForService(
  //           SERVICE_UUID,
  //           WRITE_CHARACTERISTIC,
  //           base64.encode(command)
  //         );

  //       const characteristic =
  //         await newDeviceConnection?.writeCharacteristicWithoutResponseForService(
  //           SERVICE_UUID,
  //           READ_CHARACTERISTIC,
  //           base64.encode(CharacteristicType.vin)
  //         );

  //       let vinData = { line1: '', line2: '', line3: true };

  //       const subscription = characteristic?.monitor(
  //         (error: BleError | null, characteristicMonitor: Characteristic | null) => {
  //           if (error) {
  //             console.error(error);
  //             return 'No response';
  //           }

  //           const value = base64.decode(characteristicMonitor?.value ?? '');

  //           console.log({ value });

  //           if (value?.startsWith('1:'))
  //             Object.assign(vinData, { ...vinData, line1: value.slice(3) });
  //           else if (value?.startsWith('2:'))
  //             Object.assign(vinData, { ...vinData, line2: value.slice(3) });

  //           if (vinData.line1.length > 0 && vinData.line2.length > 0 && vinData.line3) {
  //             Object.assign(vinData, { ...vinData, line3: false });
  //             finishConnection(vinData, newDeviceConnection, subscription);
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       setState({ connection: 'notConnected', device });
  //       setConnected(resetConnection);
  //       console.error('failed to connect', error);
  //     }
  // };

  const stopScan = async (): Promise<void> => {
    await bleManager.stopDeviceScan();
    setIsScanning(false);
  };

  const disconnectFromDevice = (): void => {
    if (connected.device) {
      bleManager.cancelDeviceConnection(connected.device.id);
      setConnected(resetConnection);
      setState(null);
    }
  };

  const value = useMemo(
    () => ({
      allDevices,
      bluetoothState,
      connectToDevice,
      connected,
      data,
      disconnectFromDevice,
      endMonitor,
      findVehicleByVin,
      isMonitoring,
      isScanning,
      monitorObd,
      requestPermissions,
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
      data,
      endMonitor,
      isMonitoring,
      startMonitor,
      findVehicleByVin,
      monitorObd,
      stopMonitor,
      isScanning,
      writeInObd,
      requestPermissions,
      startScan,
      state,
      stopScan
    ]
  );

  return <BluetoothContext.Provider value={value}>{children}</BluetoothContext.Provider>;
};
