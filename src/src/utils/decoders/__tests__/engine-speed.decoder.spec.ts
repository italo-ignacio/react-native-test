import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('EngineSpeedDecoder', async () => {
  const bleResponse = '010c\r41 0C 46 75 \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.engineSpeed,
    bleResponse
  );

  expect(response).toEqual(4509.25);
});
