/* eslint-disable @typescript-eslint/no-type-alias */
import type { ObdData } from '../obd-data';
import type { ObdDataAverage } from '../obd-data-average';
import type { OfflineQueue } from '../offline-queue';
import type { Vehicle, VehicleValues } from '../vehicle';
import type { VehicleBrand, VehicleBrandValues } from '../vehicle-brand';
import type { VehicleDiagnostics, VehicleDiagnosticsValues } from '../vehicle-diagnostics';
import type { VehicleModel, VehicleModelValues } from '../vehicle-model';

export interface CreateEntityMap {
  vehicles: Omit<VehicleValues, 'id'>;
  vehicle_models: Omit<VehicleModelValues, 'id'>;
  vehicle_brands: Omit<VehicleBrandValues, 'id'>;
  vehicle_diagnostics: Omit<VehicleDiagnosticsValues, 'id'>;
  offline_queue: Omit<OfflineQueue, 'id'>;
  obd_data: Omit<ObdData, 'id'>;
  obd_data_average: Omit<ObdDataAverage, 'id'>;
}

export interface EntityMap {
  vehicles: Vehicle;
  vehicle_models: VehicleModel;
  vehicle_brands: VehicleBrand;
  vehicle_diagnostics: VehicleDiagnostics;
  offline_queue: OfflineQueue;
  obd_data: ObdData;
  obd_data_average: ObdDataAverage;
}

type FilterOperator = '!=' | '<' | '<=' | '=' | '>' | '>=' | 'IN' | 'LIKE' | 'NOT IN';

export type WhereCondition<T> = {
  [K in keyof T]?: {
    operator: FilterOperator;
    value: T[K] | unknown;
  };
};

export interface WhereEntityMap {
  vehicles: WhereCondition<Vehicle>;
  vehicle_models: WhereCondition<VehicleModel>;
  vehicle_brands: WhereCondition<VehicleBrand>;
  vehicle_diagnostics: WhereCondition<VehicleDiagnostics>;
  offline_queue: WhereCondition<OfflineQueue>;
  obd_data: WhereCondition<ObdData>;
  obd_data_average: WhereCondition<ObdDataAverage>;
}

export type CreateProps<T extends keyof EntityMap> = CreateEntityMap[T];

export type UpdateProps<T extends keyof EntityMap> = Partial<CreateEntityMap[T]>;

export type WhereProps<T extends keyof EntityMap> = Partial<WhereEntityMap[T]>;

export interface PaginationProps {
  limit: number;
  page: number;
}

export type SelectProps2<T extends keyof EntityMap> = Partial<Record<keyof EntityMap[T], boolean>>;

type SelectPropsObject<T> = T extends object
  ? {
      [K in keyof T]?: SelectPropsObject<T[K]>;
    }
  : boolean;

export type SelectProps<T extends keyof EntityMap> = {
  [K in keyof EntityMap[T]]?: SelectPropsObject<EntityMap[T][K]>;
};
