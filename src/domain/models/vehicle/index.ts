import { type VehicleModel, selectAllVehicleModel } from '../vehicle-model';
import type { SelectProps } from '../database';

export interface Vehicle {
  id: number;
  apiId?: number;
  licensePlate: string;
  typeOfFuel: number;
  serialNumber: string;
  vehicleModel: VehicleModel;
  createdAt?: Date;
}

export interface VehicleValues {
  id: number;
  apiId?: number;
  licensePlate: string;
  typeOfFuel: number;
  serialNumber: string;
  vehicleModelId: number | string;
  createdAt?: Date;
}

export const selectAllVehicle: SelectProps<'vehicles'> = {
  apiId: true,
  createdAt: true,
  id: true,
  licensePlate: true,
  serialNumber: true,
  typeOfFuel: true,
  vehicleModel: selectAllVehicleModel
};
