import { BaseDecoder } from './base.decoder';

export class FuelRailPressureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 22 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    const fuelRailPressure = (256 * a + b) * 0.079;

    return fuelRailPressure;
  }
}
