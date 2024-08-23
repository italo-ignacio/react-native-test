import { type VehicleBrand, selectAllVehicleBrand } from '../vehicle-brand';
import type { SelectProps } from '../database';

export interface VehicleModel {
  id: number;
  apiId?: number;
  name: string;
  createdAt?: Date;
  vehicleBrand?: VehicleBrand;
  vehicleBrandId?: number;
}

export interface VehicleModelValues {
  id: number;
  apiId?: number;
  name: string;
  createdAt?: Date;
  vehicleBrandId: number | string;
}

export const selectAllVehicleModel: SelectProps<'vehicle_models'> = {
  apiId: true,
  createdAt: true,
  id: true,
  name: true,
  vehicleBrand: selectAllVehicleBrand
};
