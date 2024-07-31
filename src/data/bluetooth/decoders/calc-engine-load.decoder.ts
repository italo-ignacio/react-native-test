import { BaseDecoder } from './base.decoder';

export class CalcEngineLoadDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 04 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const value = Number(`0x${bytes[1]}`);

    return value / 2.55;
  }
}
