import { BaseDecoder } from './base.decoder';

export class MassAirFlowSensorDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 66 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 6) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);
    const c = Number(`0x${bytes[3]}`);
    const d = Number(`0x${bytes[4]}`);
    const e = Number(`0x${bytes[5]}`);

    const sensorASupported = (a & 1) > 0;
    const sensorBSupported = (a & 2) > 0;

    let sensorAValue = null;
    let sensorBValue = null;

    if (sensorASupported) {
      sensorAValue = (256 * b + c) / 32;
    }

    if (sensorBSupported) {
      sensorBValue = (256 * d + e) / 32;
    }

    return {
      sensorA: sensorAValue,
      sensorB: sensorBValue,
    };
  }
}
