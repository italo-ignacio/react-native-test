// @ts-nocheck
import { CharacteristicType } from 'domain/enums';
import { DecoderMap } from './decoder-map';

export default function decodeCharacteristicResponse(
  characteristicType: CharacteristicType,
  rawResponse: string
): unknown {
  const DecoderClass = DecoderMap[characteristicType];
  if (!DecoderClass) return rawResponse;

  return new DecoderClass(rawResponse).decode();
}
