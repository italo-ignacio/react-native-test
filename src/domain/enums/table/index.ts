export const TableName = {
  offlineQueue: 'offline_queue',
  vehicle: 'vehicles',
  vehicleBrand: 'vehicle_brands',
  vehicleDiagnostic: 'vehicle_diagnostics',
  vehicleModel: 'vehicle_models'
};

export const TableNameReverse = {
  offline_queue: 'offlineQueue',
  vehicle_brands: 'vehicleBrand',
  vehicle_diagnostics: 'vehicleDiagnostic',
  vehicle_models: 'vehicleModel',
  vehicles: 'vehicle'
};

export interface Ids {
  id?: number;
  apiId?: number;
}
