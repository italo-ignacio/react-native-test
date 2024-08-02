import { BaseDecoder } from './base.decoder';

export class EvapSystemVaporPressureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 32 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    ); // 32 or 54 ?

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const aUnsigned = Number(`0x${bytes[1]}`);
    const bUnsigned = Number(`0x${bytes[2]}`);

    const sign = aUnsigned & Number('0x80') ? -1 : 1;
    const a = aUnsigned ^ Number('0x80');

    return (256 * sign * a + sign * bUnsigned) / 4;
  }
}
