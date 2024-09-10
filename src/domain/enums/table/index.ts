export const TableName = {
  obdData: 'obd_data',
  obdDataAverage: 'obd_data_average',
  offlineQueue: 'offline_queue',
  vehicle: 'vehicles',
  vehicleBrand: 'vehicle_brands',
  vehicleDiagnostic: 'vehicle_diagnostics',
  vehicleModel: 'vehicle_models'
};

export const TableNameReverse = {
  obd_data: 'obdData',
  obd_data_average: 'obdDataAverage',
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
