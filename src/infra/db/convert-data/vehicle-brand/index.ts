/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VehicleBrand, VehicleBrandValues, WhereCondition } from 'domain/models';

export const convertVehicleBrandWhere = (params: {
  search?: number;
  ids?: { id?: number; apiId?: number };
}): WhereCondition<VehicleBrand> => {
  let where: WhereCondition<VehicleBrand> = {};

  if (params.search)
    where = {
      name: { operator: 'LIKE', value: `%${params.search}%` }
    };

  if (params?.ids?.apiId) where = { ...where, apiId: { operator: '=', value: params.ids?.apiId } };
  else if (params?.ids?.id) where = { ...where, id: { operator: '=', value: params.ids?.id } };

  return where;
};

export const convertVehicleBrandData = (
  data: any,
  params: { search?: number; ids?: { id?: number; apiId?: number } },
  hasPagination: boolean
): { data: Omit<VehicleBrandValues, 'id'>[]; where?: WhereCondition<VehicleBrand> } => {
  const where = convertVehicleBrandWhere(params);

  let newData: VehicleBrand[] = [];

  if (Array.isArray(data)) newData = data;
  else if (hasPagination) newData = data.content;
  else newData = [data];

  return {
    data: newData.map((item) => ({
      apiId: item.id,
      imageName: item.imageName,
      name: item.name
    })),
    where
  };
};
