import { BaseDecoder } from './base.decoder';

export class AbsoluteThrottlePositionCDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 48 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    return (Number(`0x${bytes[1]}`) * 100) / 255;
  }
}
