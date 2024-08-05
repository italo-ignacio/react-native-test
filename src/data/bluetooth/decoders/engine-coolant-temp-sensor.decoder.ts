import { BaseDecoder } from './base.decoder';

export class EngineCoolantTempSensorDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 67 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 4) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);
    const c = Number(`0x${bytes[3]}`);

    const sensorASupported = (a & 1) > 0;
    const sensorBSupported = (a & 2) > 0;

    let sensorAValue = null;
    let sensorBValue = null;

    if (sensorASupported) {
      sensorAValue = b - 40;
    }

    if (sensorBSupported) {
      sensorBValue = c - 40;
    }

    return {
      sensorA: sensorAValue,
      sensorB: sensorBValue
    };
  }
}
