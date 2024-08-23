import type { SelectProps } from '../database';

export interface VehicleBrand {
  id: number;
  apiId?: number;
  name: string;
  imageName?: string;
  createdAt?: Date;
}

export interface VehicleBrandValues {
  id: number;
  apiId?: number;
  name: string;
  imageName?: string;
  createdAt?: Date;
}

export const selectAllVehicleBrand: SelectProps<'vehicle_brands'> = {
  apiId: true,
  createdAt: true,
  id: true,
  imageName: true,
  name: true
};
