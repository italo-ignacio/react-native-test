import { BaseDecoder } from './base.decoder';

export class IntakeAirTemperatureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 0F ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const intakeAirTemperature = Number(`0x${bytes[1]}`) - 40;

    return intakeAirTemperature;
  }
}
