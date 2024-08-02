import decodeCharacteristicResponse from '../../../utils/decode-characteristic-response';
import { CharacteristicType } from '../../types';

test('MafAirFlowRateDecoder', async () => {
  const bleResponse = '0110\r41 10 46 B4 \r\r>';

  const response = await decodeCharacteristicResponse(
    CharacteristicType.mafAirFlowRate,
    bleResponse
  );

  expect(response).toEqual(181);
});
