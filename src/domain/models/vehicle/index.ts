import { type VehicleModel, selectAllVehicleModel } from '../vehicle-model';
import type { SelectProps } from '../database';
import type { SelectValues } from 'presentation/atomic-component/atom';

export type TypeOfFuel = 'DIESEL' | 'ELECTRIC' | 'ETHANOL' | 'GASOLINE' | 'HYBRID';

export const TranslateTypeOfFuel = {
  DIESEL: 'Diesel',
  ELECTRIC: 'Elétrico',
  ETHANOL: 'Etanol',
  GASOLINE: 'Gasolina',
  HYBRID: 'Híbrido'
};

export const TypeOfFuelOptions: SelectValues[] = [
  { label: 'Gasolina', value: 'GASOLINE' },
  { label: 'Etanol', value: 'ETHANOL' },
  { label: 'Diesel', value: 'DIESEL' },
  { label: 'Elétrico', value: 'ELECTRIC' },
  { label: 'Híbrido', value: 'HYBRID' }
];

export interface Vehicle {
  id: number;
  apiId?: number;
  licensePlate: string;
  typeOfFuel: TypeOfFuel;
  serialNumber: string;
  vehicleModel: VehicleModel;
  createdAt?: Date;
}

export interface VehicleValues {
  id: number;
  apiId?: number;
  licensePlate: string;
  typeOfFuel: TypeOfFuel;
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
