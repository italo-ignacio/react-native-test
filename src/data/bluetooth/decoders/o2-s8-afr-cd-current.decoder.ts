import { BaseDecoder } from './base.decoder';

export class O2S8CDCurrentDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 3B ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 5) {
      return null;
    }

    const c = Number(`0x${bytes[3]}`);
    const d = Number(`0x${bytes[4]}`);

    return (256 * c + d) / 256 - 128;
  }
}
