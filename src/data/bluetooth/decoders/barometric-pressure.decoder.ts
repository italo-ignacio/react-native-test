import { BaseDecoder } from './base.decoder';

export class BarometricPressureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 33 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const barometricPressure = Number(`0x${bytes[1]}`);
    
    return barometricPressure;
  }
}
