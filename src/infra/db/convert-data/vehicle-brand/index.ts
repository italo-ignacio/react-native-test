import type { VehicleBrand, VehicleBrandValues } from 'domain/models';

export const convertVehicleBrandData = (data: never): Omit<VehicleBrandValues, 'id'>[] => {
  let newData: VehicleBrand[] = [];

  if (Array.isArray(data)) newData = data;
  else newData = [data];

  return newData.map((item) => ({
    apiId: item.id,
    imageName: item.imageName,
    name: item.name
  }));
};
