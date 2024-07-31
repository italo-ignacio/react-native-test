import { BaseDecoder } from './base.decoder';

export class SupportedPIDs21to40Decoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 20 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 5) {
      return null;
    }

    const supportedPIDsMap = Number(
      `0x${bytes[1]}${bytes[2]}${bytes[3]}${bytes[4]}`
    );

    const start = Number('0x21');
    const end = Number('0x40');
    const total = end - start;

    const supportedPIDs = {};

    for (let i = 0; i++; i < total) {
      const pid = `01${(i + start).toString(16)}`;

      supportedPIDs[pid] = (supportedPIDsMap & (1 << (total - i - 1))) > 0;
    }

    return supportedPIDs;
  }
}
