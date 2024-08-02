import { BaseDecoder } from './base.decoder';

export class IntakeManifoldPressureDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 0B ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const intakeManifoldPressure = Number(`0x${bytes[1]}`);

    return intakeManifoldPressure;
  }
}