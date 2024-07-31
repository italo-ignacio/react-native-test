import { BaseDecoder } from './base.decoder';

export class EnginePercentTorqueDataDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 64 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 6) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);
    const c = Number(`0x${bytes[3]}`);
    const d = Number(`0x${bytes[4]}`);
    const e = Number(`0x${bytes[5]}`);

    return {
      idle: a - 125,
      point1: b - 125,
      point2: c - 125,
      point3: d - 125,
      point4: e - 125,
    };
  }
}
