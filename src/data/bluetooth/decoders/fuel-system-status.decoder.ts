import { FuelSystemStatus, FuelSystemStatuses } from 'domain/enums';
import { BaseDecoder } from './base.decoder';

export class FuelSystemStatusDecoder extends BaseDecoder {
  decode() {
    const bytes = this.rawResponse.match(/41 03 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/);

    if (!bytes || bytes.length < 2) {
      return null;
    }

    const statusValues = [Number(`0x${bytes[1]}`), Number(`0x${bytes[2]}`)];

    const statusMap = {
      0: FuelSystemStatus.motorOff,
      1: FuelSystemStatus.openInsufficientTemp,
      2: FuelSystemStatus.closedUsingOxSensor,
      4: FuelSystemStatus.openEngineLoadOrDeceleration,
      8: FuelSystemStatus.openSystemFailure,
      16: FuelSystemStatus.closedFeedbackSystemFault
    };

    const statuses: FuelSystemStatuses = {
      system1Status: statusMap[statusValues[0]],
      system2Status: statusMap[statusValues[1]]
    };

    return statuses;
  }
}
