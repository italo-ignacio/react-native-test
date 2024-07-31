import { BaseDecoder } from './base.decoder';

export class CatalystTempB2S2Decoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 3F ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    // Formula for temperature conversion may vary based on the vehicle and OBD-II standard
    return (256 * a + b) / 10 - 40;
  }
}
