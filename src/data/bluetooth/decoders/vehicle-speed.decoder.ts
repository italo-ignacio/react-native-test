import { BaseDecoder } from './base.decoder';

export class VehicleSpeedDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 0D ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const hexSpeed = bytes[1];

    return Number(`0x${hexSpeed}`);
  }
}
