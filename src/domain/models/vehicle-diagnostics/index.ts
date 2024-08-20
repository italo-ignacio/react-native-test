export interface VehicleDiagnostics {
  id: number;
  vehicleReadingData: object;
  createdAt: Date;
  vehicleId: number;
  vehicleApiId?: number;
}

export interface VehicleDiagnosticsValues {
  id: number;
  vehicleReadingData: unknown;
  date: Date;
  vehicleId: number;
  vehicleApiId?: number;
}
