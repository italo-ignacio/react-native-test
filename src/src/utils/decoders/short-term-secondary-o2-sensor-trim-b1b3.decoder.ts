import { BaseDecoder } from './base.decoder';

export class ShortTermSecondaryO2SensorTrimB1B3Decoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 55 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    return {
      b1: (100 / 128) * a - 100,
      b3: (100 / 128) * b - 100,
    };
  }
}
