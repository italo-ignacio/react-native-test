import { BaseDecoder } from './base.decoder';

export class EngineFrictionPercentTorqueDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 8E ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);

    return a - 125;
  }
}
