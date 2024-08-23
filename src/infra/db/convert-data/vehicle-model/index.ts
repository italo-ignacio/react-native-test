import { TableName } from 'domain/enums';
import type { VehicleModel, VehicleModelValues } from 'domain/models';

export const convertVehicleModelData = (data: never): Omit<VehicleModelValues, 'id'>[] => {
  let newData: VehicleModel[] = [];

  if (Array.isArray(data)) newData = data;
  else newData = [data];

  return newData.map((item) => ({
    apiId: item.id,
    name: item.name,
    vehicleBrandId: `SELECT id FROM ${TableName.vehicleBrand} WHERE apiId = ${item.vehicleBrandId}`
  }));
};
