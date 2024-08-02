import DecoderMap from './decoder-map';
import {CharacteristicType} from "./types";

export default function decodeCharacteristicResponse(
  characteristicType: CharacteristicType,
  rawResponse
) {
  const DecoderClass = DecoderMap[characteristicType];
  if (!DecoderClass) return rawResponse;

  return new DecoderClass(rawResponse).decode();
}
