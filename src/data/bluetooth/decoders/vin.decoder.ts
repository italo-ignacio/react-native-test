import { BaseDecoder } from './base.decoder';

export class VinDecoder extends BaseDecoder {
  decode() {
    console.log(`row`, this.rawResponse);

    const justHexesValues = this.rawResponse.match(/([0-9A-Fa-f]{2})/g);

    let asciiResponse = ' ';
    if (justHexesValues) {
      asciiResponse = justHexesValues.map((hex) => String.fromCharCode(parseInt(hex, 16))).join('');
    }

    return asciiResponse.trim().slice(5);
  }
}
