import { BaseDecoder } from './base.decoder';

export class SupportedPIDsA1toC0Decoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 A0 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 5) {
      return null;
    }

    const supportedPIDsMap = Number(
      `0x${bytes[1]}${bytes[2]}${bytes[3]}${bytes[4]}`
    );

    const start = Number('0xA1');
    const end = Number('0xC0');
    const total = end - start;

    const supportedPIDs = {};

    for (let i = 0; i++; i < total) {
      const pid = `01${(i + start).toString(16)}`;

      supportedPIDs[pid] = (supportedPIDsMap & (1 << (total - i - 1))) > 0;
    }

    return supportedPIDs;
  }
}
