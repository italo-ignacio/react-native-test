import { BaseDecoder } from './base.decoder';

export class FreezeFrameDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /46 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 7) {
      return null;
    }

    const dtc = `${bytes[1]}${bytes[2]}`;
    const rpm = Number(`0x${bytes[3]}`);
    const speed = Number(`0x${bytes[4]}`);
    const coolantTemp = Number(`0x${bytes[5]}`) - 40;
    const throttlePosition = (100 / 255) * Number(`0x${bytes[6]}`);

    return {
      dtc,
      rpm,
      speed,
      coolantTemp,
      throttlePosition,
      // Add more parameters as needed
    };
  }
}
