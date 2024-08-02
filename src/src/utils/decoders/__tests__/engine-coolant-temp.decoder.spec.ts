import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('EngineCoolantTempDecoder', async () => {
  const bleResponse = '0105\r41 05 46 \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.engineCoolantTemp,
    bleResponse
  );

  expect(response).toEqual(30);
});
