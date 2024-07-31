import { BaseDecoder } from './base.decoder';

export class FuelRailPressureGaugeDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 23 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    const fuelRailPressureGauge = (256 * a + b) * 0.079;

    return fuelRailPressureGauge;
  }
}
