/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-return-await */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import * as ExpoDevice from 'expo-device';
import { BleManager, State } from 'react-native-ble-plx';
import { CharacteristicType, ConvertResponseToCode, TableName } from 'domain/enums';
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
  disconnectFromDevice: () => void;
  requestPermissions: () => Promise<boolean>;
  allDevices: Device[];
  sendCommand: (code: CharacteristicType, preDevice?: Device) => Promise<void>;
  connected: connectedData;
  isScanning: boolean;
  data: { [key in CharacteristicType]?: number | string };
  isMonitoring: boolean;
  state: stateDevice;
  bluetoothState: 'off' | 'on';
  startMonitor: () => void;
  stopMonitor: () => void;
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
  const [intervals, setIntervals] = useState<NodeJS.Timeout[]>([]);
  const [activeMonitor, setActiveMonitor] = useState<Subscription | null>(null);

  let vinReceived = false;
  let vinData = { line1: '', line2: '' };

  const database = useDatabase();

  const { findRequest } = useRequest();

  // interval - interval to send the command to obd
  // timesForSend - insert the obd value into the dbList after sending it to obd {timesForSend} times
  // Example: interval:500, timesForSend:20 -- 500 * 20 = 10000 -- insert on dbList after 10 seconds
  const monitorCodes = {
    [CharacteristicType.engineSpeed]: { interval: 500, timesForSend: 20 },
    [CharacteristicType.vehicleSpeed]: { interval: 500, timesForSend: 20 },
    [CharacteristicType.engineFuelRate]: { interval: 5000, timesForSend: 2 },
    [CharacteristicType.monitorStatus]: { interval: 5000, timesForSend: 2 },
    [CharacteristicType.mafAirFlowRate]: { interval: 5000, timesForSend: 2 }
  } as { [key in CharacteristicType]: { interval: number; timesForSend: number } };

  // save dbList values in database
  const saveObdDataInterval = 30 * 1000;

  // save average of values in database
  const saveObdAverageInterval = 5 * 60 * 1000;

  const dbList: { code: CharacteristicType; value: number; vin: string }[] = [];
  const toSend: { [key in CharacteristicType]?: string[] } = {};

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

  const stopScan = async (): Promise<void> => {
    await bleManager.stopDeviceScan();
    setIsScanning(false);
  };

  const sendCommand = async (code: CharacteristicType, preDevice?: Device): Promise<void> => {
    const device = preDevice ?? connected.device;

    if (device)
      await device?.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        READ_CHARACTERISTIC,
        base64.encode(`${code}\r`)
      );
  };

  const handleResponse = (response: string, vin: string): void => {
    const prefix = response.slice(0, 5) as keyof typeof ConvertResponseToCode;

    const code = ConvertResponseToCode[prefix];

    if (!code) {
      console.error(`Resposta recebida com prefixo desconhecido: ${prefix}`);
      return;
    }

    const decodedValue = decodeCharacteristicResponse(code, response);

    if (!decodedValue) {
      console.error(`Code: ${code} - value: ${response} - Decoded: ${decodedValue}`);
      return;
    }

    console.info(`Code: ${code} - value: ${response} - Decoded: ${decodedValue}`);

    if (data[code] !== decodedValue) {
      setData((prevState) => ({ ...prevState, [code]: decodedValue }));

      toSend[code]?.push(' ');

      if (toSend[code]?.length === monitorCodes[code].timesForSend) {
        if (code === CharacteristicType.mafAirFlowRate)
          dbList.push({
            code,
            value:
              decodedValue && typeof Number(decodedValue) === 'number'
                ? (Number(decodedValue) * 3600) / (14.7 * 710)
                : 0,
            vin
          });
        else dbList.push({ code, value: Number(decodedValue), vin });

        toSend[code]?.splice(0, toSend[code]?.length);
      }
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
        const list = await tx.getAllAsync<{ value: number; vin: string; code: CharacteristicType }>(
          `SELECT AVG(value) as value, code, vin FROM ${TableName.obdData} WHERE createdAt BETWEEN "${periodStartStr}" AND "${periodEndStr}" GROUP BY code`
        );

        console.log(list);

        // if (list?.length) {
        //   await database.createMany('obd_data_average', {
        //     data: list
        //   });
        //   await database.delete('obd_data');
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const startMonitor = (): void => {
    if (
      connected.device === null ||
      connected.vehicle === null ||
      connected.vin === null ||
      isMonitoring
    )
      return;

    intervals.forEach((interval) => clearInterval(interval));
    setIntervals([]);

    setIsMonitoring(true);

    const activeIntervals = Object.entries(monitorCodes).map(([key, config]) => {
      const code = key as CharacteristicType;

      return setInterval(() => sendCommand(code), config.interval);
    });

    activeIntervals.push(setInterval(async () => await saveObdData(), saveObdDataInterval));
    activeIntervals.push(
      setInterval(async () => await saveAverageObdData(), saveObdAverageInterval)
    );

    setIntervals(activeIntervals);
  };

  useEffect(() => {
    if (
      connected.device !== null ||
      connected.vehicle !== null ||
      connected.vin !== null ||
      !isMonitoring
    )
      startMonitor();
  }, [connected]);

  const stopMonitor = async (): Promise<void> => {
    intervals.forEach((interval) => clearInterval(interval));
    setIntervals([]);
    activeMonitor?.remove();
    setActiveMonitor(null);
    setIsMonitoring(false);

    await saveObdData();
    await sleep(1000);
    await saveAverageObdData();
  };

  const disconnectFromDevice = async (): Promise<void> => {
    if (connected.device) {
      await stopMonitor();
      await sleep(1000);
      await connected.device.cancelConnection();
      setConnected(resetConnection);
    }
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

  const finishConnection = async (device: Device): Promise<void> => {
    try {
      const vin = convertOBDResponseToVIN(vinData);

      await findVehicleByVin(vin, device);

      stopScan();
      setState({ connection: 'isConnected', device });
    } catch (error) {
      setState({ connection: 'notConnected', device });
      setConnected(resetConnection);
      console.error('failed to connect', error);
    }
  };

  const monitorData = (device: Device): void => {
    const monitor = device.monitorCharacteristicForService(
      SERVICE_UUID,
      READ_CHARACTERISTIC,
      (error: BleError | null, characteristic: Characteristic | null) => {
        if (error) {
          console.error('Erro ao monitorar dados:', error);
          return;
        }

        if (characteristic?.value && characteristic?.value.length > 0) {
          const response = String(base64.decode(characteristic.value));

          // Vin response
          if ((response.startsWith('1:') || response.startsWith('2:')) && !vinReceived) {
            if (response.startsWith('1:')) vinData.line1 = response.slice(3);
            else if (response.startsWith('2:')) vinData.line2 = response.slice(3);

            if (vinData.line1.length > 0 && vinData.line2.length > 0 && !vinReceived) {
              vinReceived = true;
              finishConnection(device);
            }

            // Code response
          } else if (connected?.vin) handleResponse(response, connected.vin);
        }
      }
    );

    setActiveMonitor(monitor);
  };

  const connectToDevice = async (device: Device): Promise<void> => {
    if (state?.connection === 'isConnecting') return;

    vinReceived = false;
    vinData = { line1: '', line2: '' };

    try {
      setState({ connection: 'isConnecting', device });

      if (connected?.device) {
        await disconnectFromDevice();
        await sleep(3000);
      }

      await device.connect();
      await device.discoverAllServicesAndCharacteristics();
      monitorData(device);

      await sleep(1000);

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
      // const protocols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      // const protocol = protocols[0];
      // const commands = ['ATZ\r', 'ATE0\r', 'ATH0\r', 'ATL0\r', `ATSP${protocol}\r`];

      await sendCommand(CharacteristicType.vin, device);

      await sleep(15000);

      if (!vinReceived) await sendCommand(CharacteristicType.vin2, device);

      await sleep(15000);

      if (!vinReceived) {
        setState({ connection: 'notConnected', device });
        setConnected(resetConnection);
        stopMonitor();
        console.error('Não foi possível obter o VIN do veículo.');
      }
    } catch (error) {
      setState({ connection: 'notConnected', device });
      setConnected(resetConnection);
      stopMonitor();
      console.error('failed to connect', error);
    }
  };

  useEffect(() => {
    const subscription = bleManager.onStateChange((value) => {
      if (value === State.PoweredOn) setBluetoothState('on');
      else {
        disconnectFromDevice();
        setBluetoothState('off');
        setAllDevices([]);
        bleManager.stopDeviceScan();
        setIsScanning(false);
        setState(null);
      }
    }, true);

    return () => {
      subscription.remove();
    };
  }, [bleManager]);

  const value = useMemo(
    () => ({
      allDevices,
      bluetoothState,
      connectToDevice,
      connected,
      data,
      disconnectFromDevice,
      findVehicleByVin,
      isMonitoring,
      isScanning,
      requestPermissions,
      sendCommand,
      startMonitor,
      startScan,
      state,
      stopMonitor,
      stopScan
    }),
    [
      allDevices,
      connectToDevice,
      disconnectFromDevice,
      connected,
      bluetoothState,
      data,
      isMonitoring,
      sendCommand,
      startMonitor,
      findVehicleByVin,
      stopMonitor,
      isScanning,
      requestPermissions,
      startScan,
      state,
      stopScan
    ]
  );

  return <BluetoothContext.Provider value={value}>{children}</BluetoothContext.Provider>;
};
