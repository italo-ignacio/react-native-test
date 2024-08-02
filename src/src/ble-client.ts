import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import Deferred from './utils/deferred';
import { CharacteristicType } from './utils/types/characteristic-type';
import { PermissionsAndroid, Platform } from 'react-native';
import * as ExpoDevice from 'expo-device';
import decodeCharacteristicResponse from './utils/decode-characteristic-response';

const SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const WRITE_CHARACTERISTIC = '0000fff2-0000-1000-8000-00805f9b34fb';
const READ_CHARACTERISTIC = '0000fff1-0000-1000-8000-00805f9b34fb';
// const DEVICE_NAME = 'OBDII'; // Change this to the name of your simulator device
// const DEVICE_NAME = 'Miga’s MacBook Pro (577)'; // Change this to the name of your simulator device

// const DEVICE_NAME = 'Ilija’s MacBook Pro (4)';
const DEVICE_NAME = 'OBD BLE';

type BLEResponse = {
  raw: string;
  decoded: any;
};

let responseDeferred = new Deferred<BLEResponse>();
let rawResponse = '';
let currentReadingCode: CharacteristicType;

export class BleClient {
  private readonly bleManager: BleManager;
  connectedDevice: Device | null | undefined;
  isSubscribed = false;

  constructor(bleManager: BleManager) {
    this.bleManager = bleManager;
  }

  scanDevices(callback: (device: Device | null) => void) {
    this.bleManager.startDeviceScan([SERVICE_UUID], {}, async (error, device) => {
      console.log(
        '🚀 ~ file: BleClient.ts:52 ~ bleManager.startDeviceScan ~ device:',
        device?.name
      );

      if (error) {
        console.log(error);
      }
      if (device && device.name === DEVICE_NAME) {
        callback(device);
      }
      // let timeDiff = currentDate - startScanDate;
      // if (timeDiff > SCAN_TIMEOUT) {
      //   this.bleManager.stopDeviceScan();
      //
      //   const nearestDevice = foundDevices.sort((a, b) => a.rssi - b.rssi)[0];
      //   console.log('Connecting to SPARQ Device');
      //   await this.connectToDevice(nearestDevice, callback);
      //   return;
      // }
    });
  }

  stopScan() {
    this.bleManager.stopDeviceScan();
  }

  scanAndConnectToDevice(callback: (device: Device | null) => void) {
    this.bleManager.startDeviceScan([SERVICE_UUID], {}, async (error, device) => {
      console.log(
        '🚀 ~ file: BleClient.ts:83 ~ bleManager.startDeviceScan ~ device:',
        device?.name
      );

      if (error) {
        console.log(error);
      }
      if (device && device.name === DEVICE_NAME) {
        console.log('Connecting to SPARQ Device');
        await this.connectToDevice(device, callback);
        return;
      }
    });
  }

  readCharacteristic(code: CharacteristicType): Promise<BLEResponse> | undefined {
    this.clearResponses();

    try {
      currentReadingCode = code;

      this.connectedDevice?.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        WRITE_CHARACTERISTIC,
        base64.encode(code)
      );

      responseDeferred = new Deferred<BLEResponse>();
      return responseDeferred.promise;
    } catch (e) {
      console.log('FAILED TO send signal', e);
      return undefined;
    }
  }

  async disconnectFromDevice() {
    this.clearResponses();
    this.isSubscribed = false;

    if (this.connectedDevice) {
      try {
        await this.bleManager.cancelDeviceConnection(this.connectedDevice.id);
      } catch (e) {
        console.log('An error occurred while trying to disconnect: ', e);
      }
    }

    this.connectedDevice = null;
  }

  async requestPermissions() {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonPositive: 'OK'
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted = await this.requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  }

  private async requestAndroid31Permissions() {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK'
      }
    );

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK'
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK'
      }
    );

    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothConnectPermission === 'granted' &&
      fineLocationPermission === 'granted'
    );
  }

  private async connectToDevice(device: Device, callback: (device: Device | null) => void) {
    try {
      this.bleManager.stopDeviceScan();

      device = await this.bleManager.connectToDevice(device.id);

      device = await device.discoverAllServicesAndCharacteristics();

      this.connectedDevice = device;

      this.startStreamingData(callback);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  }

  private startStreamingData(callback: (device: Device | null) => void) {
    if (!this.connectedDevice) {
      callback(null);
      return;
    }
    this.connectedDevice.monitorCharacteristicForService(
      SERVICE_UUID,
      READ_CHARACTERISTIC,
      this.onResponseUpdate
    );
    this.isSubscribed = true;
    callback(this.connectedDevice);
  }

  private onResponseUpdate(error: BleError | null, characteristic: Characteristic | null) {
    if (error) {
      console.log(error);
      return 'No response';
    } else if (!characteristic?.value) {
      console.log('No Data was received');
      return 'No Data was received';
    }

    const decodedData = base64.decode(characteristic.value);
    rawResponse += decodedData;

    // Every message from the device ends with '>', so look for that, then process it
    if (decodedData.substring(decodedData.length - 1) == '>') {
      const decodedResponse = decodeCharacteristicResponse(currentReadingCode, rawResponse);

      responseDeferred.resolve({
        raw: rawResponse,
        decoded: decodedResponse
      });
    }
  }

  clearResponses() {
    rawResponse = '';
  }
}
