import { BaseDecoder } from './base.decoder';

export class ABSDisableSwitchStateDecoder extends BaseDecoder {
  public decode(): boolean | null {
    const bytes = this.rawResponse.match(/41 A9 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/u);

    if (!bytes || bytes.length < 3) return null;

    const first = Number(`0x${bytes[1]}`);
    const second = Number(`0x${bytes[2]}`);

    if (!(first && 1)) return null;

    return (second && 1) > 0;
  }
}
