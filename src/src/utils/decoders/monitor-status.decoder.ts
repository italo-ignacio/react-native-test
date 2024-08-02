import { BaseDecoder } from './base.decoder';
import { MonitorStatus } from '../types';

export class MonitorStatusDecoder extends BaseDecoder {
  decode() {
    // TODO: Test on real device. This characteristic should return 4 bytes, but the simulator returns only 3

    const bytes = this.rawResponse.match(
      /41 01 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 4) {
      return null;
    }

    const a = Number(`0x${bytes[1]}`);
    const b = Number(`0x${bytes[2]}`);

    const isCELOn = (a & 128) > 0;
    const isDiesel = (b & 8) > 0;

    const status: MonitorStatus = {
      isCELOn,
      isDiesel,
    };

    return status;
  }
}
