/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableName } from 'domain/enums';
import type { Vehicle, VehicleValues } from 'domain/models';

export const convertVehicleData = (
  data: any,
  where: object,
  hasPagination: boolean
): { data: Omit<VehicleValues, 'id'>[]; where?: unknown } => {
  let newData: Vehicle[] = [];

  if (hasPagination) newData = data.content;
  else newData = [data];

  return {
    data: newData.map((item) => ({
      apiId: item.id,
      licensePlate: item.licensePlate,
      serialNumber: item.serialNumber,
      typeOfFuel: item.typeOfFuel,
      vehicleModelId: `SELECT id FROM ${TableName.vehicleModel} WHERE apiId = ${item.vehicleModel.id}`
    })),
    where
  };
};
