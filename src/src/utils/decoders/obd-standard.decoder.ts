import { BaseDecoder } from './base.decoder';

export class OBDStandardDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 1C ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const obdStandard = Number(`0x${bytes[1]}`);

    return obdStandard;
  }
}
