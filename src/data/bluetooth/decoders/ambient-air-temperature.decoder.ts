import { BaseDecoder } from './base.decoder';

export class AmbientAirTemperatureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 46 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const temp = Number(`0x${bytes[1]}`);

    return temp - 40;
  }
}
