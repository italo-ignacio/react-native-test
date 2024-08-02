import { BaseDecoder } from './base.decoder';

export class MaxValuesAFRVoltageCurrentIMAPDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 4F ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 5) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);
    const c = Number(`0x${bytes[3]}`);
    const d = Number(`0x${bytes[4]}`);

    return {
      afr: a,
      voltage: b,
      current: c,
      imap: d * 10,
    };
  }
}
