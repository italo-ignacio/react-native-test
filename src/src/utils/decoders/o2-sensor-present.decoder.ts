import { BaseDecoder } from './base.decoder';

export class O2SensorPresentDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 1E ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const sensorBitmap = Number(`0x${bytes[1]}`);

    // Example: if bit 0 is set, O2 Sensor 1 is present
    const o2Sensor1Present = (sensorBitmap & 0b00000001) !== 0;
    // Example: if bit 1 is set, O2 Sensor 2 is present
    const o2Sensor2Present = (sensorBitmap & 0b00000010) !== 0;
    // ... Repeat for other sensors

    return {
      o2Sensor1Present,
      o2Sensor2Present,
      // ... Include other sensors as needed
    };
  }
}
