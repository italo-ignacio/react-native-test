import { BaseDecoder } from './base.decoder';

export class FuelTankLevelInputDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 2F ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    return (100 / 255) * Number(`0x${bytes[1]}`);
  }
}
