import { BaseDecoder } from './base.decoder';

export class CommandedDieselExhaustFluidDosingDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 A5 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    ); // Should return 4 bytes, but only 2 are used

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    if (!(a & 1)) return null;

    return b / 2;
  }
}
