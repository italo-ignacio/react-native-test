/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableName } from 'domain/enums';
import { store } from 'store';
import type { VehicleModel, VehicleModelValues, WhereCondition } from 'domain/models';

export const convertVehicleModelWhere = (params: {
  search?: number;
  ids?: { id?: number; apiId?: number };
  brandId?: number;
}): WhereCondition<VehicleModel> => {
  let where: WhereCondition<VehicleModel> = {};

  if (params.search)
    where = {
      name: { operator: 'LIKE', value: `%${params.search}%` }
    };

  if (params.ids?.apiId) where = { ...where, apiId: { operator: '=', value: params.ids?.apiId } };
  else if (params.ids?.id) where = { ...where, id: { operator: '=', value: params.ids?.id } };

  const { hasInternetConnection } = store.getState().netInfo;

  if (params.brandId)
    where = {
      ...where,
      vehicleBrandId: {
        operator: '=',
        value: hasInternetConnection
          ? `SELECT id FROM ${TableName.vehicleBrand} WHERE apiId = ${params.brandId}`
          : params.brandId
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

  if (Array.isArray(data)) newData = data;
  else if (hasPagination) newData = data.content;
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
