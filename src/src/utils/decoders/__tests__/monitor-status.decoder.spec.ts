import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('MonitorStatusDecoder', async () => {
  const bleResponses = [
    '0101\r41 01 82 56 92 \r\r>',
    '0101\r41 01 73 69 FA \r\r>',
  ];
  const expectedResponses = [
    { isCELOn: true, isDiesel: false },
    { isCELOn: false, isDiesel: true },
  ];

  for (let i = 0; i < bleResponses.length; i++) {
    const response = await decodeCharacteristicResponse(
      CharacteristicType.monitorStatus,
      bleResponses[i]
    );

    expect(response).toEqual(expectedResponses[i]);
  }
});
