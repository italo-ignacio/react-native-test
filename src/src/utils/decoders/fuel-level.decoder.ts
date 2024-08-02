import { BaseDecoder } from './base.decoder';

export class FuelLevelDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 2F ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const fuelLevel = Number(`0x${bytes[1]}`);
    
    return (fuelLevel * 100) / 255;
  }
}
