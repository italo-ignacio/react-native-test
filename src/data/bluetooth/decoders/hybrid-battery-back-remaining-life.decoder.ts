import { BaseDecoder } from './base.decoder';

export class HybridBatteryBackRemainingLifeDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 5B ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);

    return (100 / 255) * a;
  }
}
