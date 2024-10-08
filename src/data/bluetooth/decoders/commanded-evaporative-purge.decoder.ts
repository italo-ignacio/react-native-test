import { BaseDecoder } from './base.decoder';

export class CommandedEvaporativePurgeDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 2E ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const commandedEvaporativePurge = (100 / 255) * Number(`0x${bytes[1]}`);

    return commandedEvaporativePurge;
  }
}
