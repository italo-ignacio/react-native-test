import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('VehicleSpeedDecoder', async () => {
  const bleResponse = '010d\r41 0D 46 \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.vehicleSpeed,
    bleResponse
  );

  expect(response).toEqual(70);
});
