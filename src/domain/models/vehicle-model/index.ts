import type { VehicleBrand } from '../vehicle-brand';

export interface VehicleModel {
  id: number;
  apiId?: number;
  name: string;
  createdAt?: Date;
  vehicleBrand: VehicleBrand;
}

export interface VehicleModelValues {
  id: number;
  apiId?: number;
  name: string;
  createdAt?: Date;
  vehicleBrandId: number;
}
