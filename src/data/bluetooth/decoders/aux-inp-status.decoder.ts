import { BaseDecoder } from './base.decoder';

export class AuxInputStatusDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 1E ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const auxInputStatus = Number(`0x${bytes[1]}`);

    return auxInputStatus;
  }
}
