import { BaseDecoder } from './base.decoder';

export class AcceleratorPedalPositionDDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 49 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    return (Number(`0x${bytes[1]}`) * 100) / 255;
  }
}
