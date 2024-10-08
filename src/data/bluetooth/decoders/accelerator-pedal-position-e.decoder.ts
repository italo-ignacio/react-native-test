import { BaseDecoder } from './base.decoder';

export class AcceleratorPedalPositionEDecoder extends BaseDecoder {
  public decode(): number | null {
    const bytes = this.rawResponse.match(/41 4A ([A-Fa-f0-9]{2})/u);

    if (!bytes || bytes.length < 2) return null;

    return (Number(`0x${bytes[1]}`) * 100) / 255;
  }
}
