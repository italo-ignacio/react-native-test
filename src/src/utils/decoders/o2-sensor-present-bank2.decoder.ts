import { BaseDecoder } from './base.decoder';

export class OxygenSensorsPresentBanks2Decoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 13 ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const oxygenSensorsPresentBanks2 = Number(`0x${bytes[1]}`);

    return oxygenSensorsPresentBanks2;
  }
}
