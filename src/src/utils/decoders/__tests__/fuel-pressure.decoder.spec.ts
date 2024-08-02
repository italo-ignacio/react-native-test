import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('FuelPressureDecoder', async () => {
  const bleResponse = '010a\r41 0A 46 \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.fuelPressure,
    bleResponse
  );

  expect(response).toEqual(210);
});
