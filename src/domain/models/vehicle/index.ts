import type { VehicleModel } from '../vehicle-model';

export interface Vehicle {
  id: number;
  apiId?: number;
  licensePlate: string;
  typeOfFuel: number;
  serialNumber: string;
  model: VehicleModel;
}

export interface VehicleValues {
  id: number;
  apiId?: number;
  licensePlate: string;
  typeOfFuel: number;
  serialNumber: string;
  vehicleModelId: number;
}
