import { BaseDecoder } from './base.decoder';

export class FuelTrimBank2LongTermDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 09 ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const fuelTrimBank1ShortTerm = (100 / 128) * (Number(`0x${bytes[1]}`) - 128);

    return fuelTrimBank1ShortTerm;
  }
}
