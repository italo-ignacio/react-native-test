import { BaseDecoder } from './base.decoder';

export class AbsoluteEvapSystemVaporPressureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 53 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    return (256 * a + b) / 200;
  }
}
