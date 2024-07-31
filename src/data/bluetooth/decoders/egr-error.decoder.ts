import { BaseDecoder } from './base.decoder';

export class EGRErrorDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 2D ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const egrError = (100 / 128) * (Number(`0x${bytes[1]}`) - 128);

    return egrError;
  }
}
