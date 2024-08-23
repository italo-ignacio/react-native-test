/* eslint-disable @typescript-eslint/no-type-alias */
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
}

export interface SelectEntityMap {
  vehicles: Vehicle;
  vehicle_models: VehicleModel;
  vehicle_brands: VehicleBrand;
  vehicle_diagnostics: VehicleDiagnostics;
  offline_queue: OfflineQueue;
}

export interface SelectEntityReturnMap {
  vehicles: Vehicle;
  vehicle_models: VehicleModel;
  vehicle_brands: VehicleBrand;
  vehicle_diagnostics: VehicleDiagnostics;
  offline_queue: OfflineQueue;
}

export interface FastSelectEntityReturnMap {
  vehicles: Vehicle;
  vehicle_models: VehicleModel;
  vehicle_brands: VehicleBrand;
  vehicle_diagnostics: VehicleDiagnostics;
  offline_queue: OfflineQueue;
}

type FilterOperator = '!=' | '<' | '<=' | '=' | '>' | '>=' | 'LIKE';

type WhereCondition<T> = {
  [K in keyof T]?: {
    operator: FilterOperator;
    value: T[K];
  };
};

export interface WhereEntityMap {
  vehicles: WhereCondition<Vehicle>;
  vehicle_models: WhereCondition<VehicleModel>;
  vehicle_brands: WhereCondition<VehicleBrand>;
  vehicle_diagnostics: WhereCondition<VehicleDiagnostics>;
  offline_queue: WhereCondition<OfflineQueue>;
}

export type CreateProps<T extends keyof SelectEntityMap> = CreateEntityMap[T];

export type UpdateProps<T extends keyof SelectEntityMap> = Partial<CreateEntityMap[T]>;

export type WhereProps<T extends keyof SelectEntityMap> = Partial<WhereEntityMap[T]>;

export interface PaginationProps {
  limit: number;
  page: number;
}

export type SelectProps2<T extends keyof SelectEntityMap> = Partial<
  Record<keyof SelectEntityMap[T], boolean>
>;

type SelectPropsObject<T> = T extends object
  ? {
      [K in keyof T]?: SelectPropsObject<T[K]>;
    }
  : boolean;

export type SelectProps<T extends keyof SelectEntityMap> = {
  [K in keyof SelectEntityMap[T]]?: SelectPropsObject<SelectEntityMap[T][K]>;
};
