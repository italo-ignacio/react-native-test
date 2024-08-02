import { BaseDecoder } from './base.decoder';

export class AbsoluteBarometricPressureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 33 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    return Number(`0x${bytes[1]}`);
  }
}
