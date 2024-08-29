/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableName } from 'domain/enums';
import type { Vehicle, VehicleBrand, VehicleValues, WhereCondition } from 'domain/models';

export const convertVehicleWhere = (params: {
  search?: string;
  ids?: { id?: number; apiId?: number };
}): WhereCondition<VehicleBrand> => {
  let where: WhereCondition<VehicleBrand> = {};

  if (params.search)
    where = {
      name: { operator: 'LIKE', value: `%${params.search}%` }
    };

  if (params.ids?.apiId) where = { ...where, apiId: { operator: '=', value: params.ids?.apiId } };
  if (params.ids?.id) where = { ...where, id: { operator: '=', value: params.ids?.id } };

  return where;
};

export const convertVehicleData = (
  data: any,
  params: object & { ids?: { id?: number; apiId?: number } },
  hasPagination: boolean
): { data: Omit<VehicleValues, 'id'>[]; where?: unknown } => {
  const where = convertVehicleWhere(params);

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
