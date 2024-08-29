/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableName } from 'domain/enums';
import type { VehicleModel, VehicleModelValues, WhereCondition } from 'domain/models';

export const convertVehicleModelWhere = (params: {
  search?: number;
  ids?: { id?: number; apiId?: number };
  brandId?: number;
  apiBrandId?: number;
}): WhereCondition<VehicleModel> => {
  let where: WhereCondition<VehicleModel> = {};

  if (params.search)
    where = {
      name: { operator: 'LIKE', value: `%${params.search}%` }
    };

  if (params.ids?.apiId) where = { ...where, apiId: { operator: '=', value: params.ids?.apiId } };
  else if (params.ids?.id) where = { ...where, id: { operator: '=', value: params.ids?.id } };

  if (params.brandId)
    where = { ...where, vehicleBrandId: { operator: '=', value: params.brandId } };
  else if (params.apiBrandId)
    where = {
      ...where,
      vehicleBrandId: {
        operator: '=',
        value: `SELECT id FROM ${TableName.vehicleBrand} WHERE apiId = ${params.apiBrandId}`
      }
    };

  return where;
};

export const convertVehicleModelData = (
  data: any,
  params: {
    search?: number;
    ids?: { id?: number; apiId?: number };
    brandId?: number;
    apiBrandId?: number;
  },
  hasPagination: boolean
): { data: Omit<VehicleModelValues, 'id'>[]; where?: WhereCondition<VehicleModel> } => {
  const where = convertVehicleModelWhere(params);

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
