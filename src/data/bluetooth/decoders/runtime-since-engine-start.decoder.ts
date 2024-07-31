import { BaseDecoder } from './base.decoder';

export class RuntimeSinceEngineStartDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(
      /41 1F ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 3) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    const runtimeSinceEngineStart = (256 * a + b);

    return runtimeSinceEngineStart;
  }
}
