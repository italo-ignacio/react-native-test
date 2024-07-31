import { BaseDecoder } from './base.decoder';

export class TimingAdvanceDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 0E ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const timingAdvance = (Number(`0x${bytes[1]}`) / 2) - 64;

    return timingAdvance;
  }
}
