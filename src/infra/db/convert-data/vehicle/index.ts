import { TableName } from 'domain/enums';
import type { Vehicle, VehicleValues } from 'domain/models';

export const convertVehicleData = (data: never): Omit<VehicleValues, 'id'>[] => {
  let newData: Vehicle[] = [];

  if (Array.isArray(data)) newData = data;
  else newData = [data];

  return newData.map((item) => ({
    apiId: item.id,
    licensePlate: item.licensePlate,
    serialNumber: item.serialNumber,
    typeOfFuel: item.typeOfFuel,
    vehicleModelId: `SELECT id FROM ${TableName.vehicleModel} WHERE apiId = ${item.vehicleModel.id}`
  }));
};
