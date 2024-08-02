import { BaseDecoder } from './base.decoder';

export class RelativeThrottlePositionDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 45 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const throttlePosition = Number(`0x${bytes[1]}`);

    return (throttlePosition * 100) / 255;
  }
}
