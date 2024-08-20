import type { VehicleBrand } from '../vehicle-brand';

export interface VehicleModel {
  id: number;
  apiId?: number;
  name: string;
  brand: VehicleBrand;
}

export interface VehicleModelValues {
  id: number;
  apiId?: number;
  name: string;
  vehicleBrandId: number;
}
