export const TableName = {
  OFFLINE_QUEUE: 'offline_queue',
  VEHICLEBRANDS: 'vehicle_brands',
  VEHICLEDIAGNOSTICS: 'vehicle_diagnostics',
  VEHICLEMODELS: 'vehicle_models',
  VEHICLES: 'vehicles'
};

export type DatabaseEntity =
  | 'offline_queue'
  | 'vehicle_brands'
  | 'vehicle_diagnostics'
  | 'vehicle_models'
  | 'vehicles';

export type ModelReturn = 'entity' | 'id' | 'none';
