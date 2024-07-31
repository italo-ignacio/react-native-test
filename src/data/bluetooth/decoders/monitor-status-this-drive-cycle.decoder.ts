import { BaseDecoder } from './base.decoder';

export class MonitorStatusThisDriveCycleDecoder extends BaseDecoder {
  decode() {
    // TODO: Test on real device. This characteristic should return 4 bytes, but the simulator returns only 3

    const bytes = this.rawResponse.match(
      /41 41 ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2}) ([A-Fa-f0-9]{2})/
    );

    if (!bytes || bytes.length < 4) {
      return null;
    }

    const b = Number(`0x${bytes[2]}`);

    const isDiesel = (b & 8) > 0;

    return {
      isDiesel,
    };
  }
}
