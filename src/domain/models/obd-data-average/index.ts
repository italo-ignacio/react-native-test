import type { CharacteristicType } from 'domain/enums';
import type { SelectProps } from '../database';

export interface ObdDataAverage {
  id: number;
  code: CharacteristicType;
  value: number;
  vin: string;
  createdAt?: Date;
}

export const selectAllObdDataAverage: SelectProps<'obd_data_average'> = {
  code: true,
  createdAt: true,
  id: true,
  value: true,
  vin: true
};
