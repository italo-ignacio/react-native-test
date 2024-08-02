import { BaseDecoder } from './base.decoder';

export class CommandedEGRDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 2C ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const commandedEGR = (100 / 255) * Number(`0x${bytes[1]}`);

    return commandedEGR;
  }
}
