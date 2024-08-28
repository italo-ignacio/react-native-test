/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableName } from 'domain/enums';
import type { VehicleModel, VehicleModelValues } from 'domain/models';

export const convertVehicleModelData = (
  data: any,
  where: object & { limit?: number; page?: number },
  hasPagination: boolean
): { data: Omit<VehicleModelValues, 'id'>[]; where?: unknown } => {
  let newData: VehicleModel[] = [];

  if (hasPagination) newData = data.content;
  else newData = [data];

  return {
    data: newData.map((item) => ({
      apiId: item.id,
      name: item.name,
      vehicleBrandId: `SELECT id FROM ${TableName.vehicleBrand} WHERE apiId = ${item.vehicleBrandId}`
    })),
    where
  };
};
