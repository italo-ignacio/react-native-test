import { BaseDecoder } from './base.decoder';

export class OxygenSensor4AFRCDVoltageDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 27 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    const voltage = (a / 200) * b;

    return voltage;
  }
}
