import { BaseDecoder } from './base.decoder';

export class VinDecoder extends BaseDecoder {
  decode() {
    const justHexesValues = this.rawResponse.match(/([0-9A-Fa-f]{2})/g); // Converts from full device response to array of hex values

    let asciiResponse = ' ';
    if (justHexesValues) {
      asciiResponse = justHexesValues
        .map((hex) => String.fromCharCode(parseInt(hex, 16)))
        .join(''); // Converts from hex string to ascii char values
    }

    return asciiResponse.trim().slice(5);
  }
}
