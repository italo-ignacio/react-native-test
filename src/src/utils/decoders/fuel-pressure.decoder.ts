import { BaseDecoder } from './base.decoder';

export class FuelPressureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 0A ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const value = Number(`0x${bytes[1]}`);

    return value * 3;
  }
}
