import type { OfflineQueueValues } from '../offline-queue';
import type { VehicleBrandValues } from '../vehicle-brand';
import type { VehicleDiagnosticsValues } from '../vehicle-diagnostics';
import type { VehicleModelValues } from '../vehicle-model';
import type { VehicleValues } from '../vehicle';

export interface CreateEntityMap {
  vehicles: Omit<VehicleValues, 'id'>;
  vehicle_models: Omit<VehicleModelValues, 'id'>;
  vehicle_brands: Omit<VehicleBrandValues, 'id'>;
  vehicle_diagnostics: Omit<VehicleDiagnosticsValues, 'id'>;
  offline_queue: Omit<OfflineQueueValues, 'id'>;
}
