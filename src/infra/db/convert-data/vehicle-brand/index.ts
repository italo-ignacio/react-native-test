/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VehicleBrand, VehicleBrandValues, WhereCondition } from 'domain/models';

export const convertVehicleBrandData = (
  data: any,
  params: { search?: number },
  hasPagination: boolean
): { data: Omit<VehicleBrandValues, 'id'>[]; where?: WhereCondition<VehicleBrand> } => {
  let where: WhereCondition<VehicleBrand> = {};

  if (params.search)
    where = {
      name: { operator: 'LIKE', value: `%${params.search}%` }
    };

  let newData: VehicleBrand[] = [];

  if (hasPagination) newData = data.content;
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
