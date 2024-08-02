import { BaseDecoder } from './base.decoder';

export class MaxAirFlowRateFromMAFDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 50 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 5) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);

    return a * 10;
  }
}
