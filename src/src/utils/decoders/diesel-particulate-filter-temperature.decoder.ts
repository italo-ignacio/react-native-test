import { BaseDecoder } from './base.decoder';

export class DieselParticulateFilterTemperatureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 7C ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    ); // Should return 9 bytes in total, but only 2 are needed

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    return (256 * a + b) / 10 - 40;
  }
}
