import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('FuelSystemStatusDecoder', async () => {
  const bleResponse = '0103\r41 03 10 02 \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.fuelSystemStatus,
    bleResponse
  );

  expect(response).toEqual({
    system1Status: 'closedFeedbackSystemFault',
    system2Status: 'closedUsingOxSensor',
  });
});
