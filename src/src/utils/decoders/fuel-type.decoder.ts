import { BaseDecoder } from './base.decoder';

export class FuelTypeDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 51 ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const fuelTypeCode = Number(`0x${bytes[1]}`);

    // Interpret the fuel type code based on the OBD-II standard
    let fuelType;
    switch (fuelTypeCode) {
      case 0:
        fuelType = 'Not available';
        break;
      case 0x01:
        fuelType = 'Gasoline';
        break;
      case 0x02:
        fuelType = 'Methanol';
        break;
      case 0x03:
        fuelType = 'Ethanol';
        break;
      case 0x04:
        fuelType = 'Diesel';
        break;
      case 0x05:
        fuelType = 'LPG';
        break;
      case 0x06:
        fuelType = 'CNG';
        break;
      case 0x07:
        fuelType = 'Propane';
        break;
      case 0x08:
        fuelType = 'Electric';
        break;
      case 0x09:
        fuelType = 'Bifuel running Gasoline';
        break;
      case 0x0a:
        fuelType = 'Bifuel running Methanol';
        break;
      case 0x0b:
        fuelType = 'Bifuel running Ethanol';
        break;
      case 0x0c:
        fuelType = 'Bifuel running LPG';
        break;
      case 0x0d:
        fuelType = 'Bifuel running CNG';
        break;
      case 0x0e:
        fuelType = 'Bifuel running Propane';
        break;
      case 0x0f:
        fuelType = 'Bifuel running Electricity';
        break;
      case 0x10:
        fuelType = 'Bifuel running electric and combustion engine';
        break;
      case 0x11:
        fuelType = 'Hybrid gasoline';
        break;
      case 0x12:
        fuelType = 'Hybrid Ethanol';
        break;
      case 0x13:
        fuelType = 'Hybrid Diesel';
        break;
      case 0x14:
        fuelType = 'Hybrid Electric';
        break;
      case 0x15:
        fuelType = 'Hybrid running electric and combustion engine';
        break;
      case 0x16:
        fuelType = 'Hybrid Regenerative';
        break;
      case 0x17:
        fuelType = 'Bifuel running diesel';
        break;
      default:
        fuelType = 'Unknown';
    }

    return fuelType;
  }
}
