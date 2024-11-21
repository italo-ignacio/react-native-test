import type { CharacteristicType } from 'domain/enums';
import type { SelectProps } from '../database';

export interface ObdData {
  id: number;
  code: CharacteristicType;
  value: number;
  vin: string;
  createdAt?: Date;
}

export const selectAllObdData: SelectProps<'obd_data'> = {
  code: true,
  createdAt: true,
  id: true,
  value: true,
  vin: true
};
