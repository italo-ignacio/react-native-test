import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('CalEngineLoadDecoder', async () => {
  const bleResponse = '0104\r41 04 FF \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.calcEngineLoad,
    bleResponse
  );

  expect(response).toEqual(100);
});
