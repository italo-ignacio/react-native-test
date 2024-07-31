import { BaseDecoder } from './base.decoder';

export class AbsoluteEvapSystemVaporPressureDecoder extends BaseDecoder {
  public decode(): number | null {
    const bytes = this.rawResponse.match(/41 53 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/u);

    if (!bytes || bytes.length < 3) return null;

    const first = Number(`0x${bytes[1]}`);
    const second = Number(`0x${bytes[2]}`);

    return (256 * first + second) / 200;
  }
}
