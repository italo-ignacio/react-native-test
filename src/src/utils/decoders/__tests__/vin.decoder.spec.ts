import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('VinDecoder', async () => {
  const bleResponse =
    '0902\r014 \r0: 49 02 0' +
    '1 57 41' +
    '31 \r1: 45 41 41 46 5' +
    '9 31 4E \r2: 32 30 32' +
    '31 3' +
    '2 38 37 \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.vin,
    bleResponse
  );

  expect(response).toEqual('WA1EAAFY1N2021287');
});
