import { BaseDecoder } from './base.decoder';

export class CommandedSecondaryAirStatusDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 12 ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const commandedSecondaryAirStatus = Number(`0x${bytes[1]}`);

    return commandedSecondaryAirStatus;
  }
}
