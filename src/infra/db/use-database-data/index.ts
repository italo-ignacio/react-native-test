/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/init-declarations */
import {
  type SelectEntityMap,
  selectAllVehicle,
  selectAllVehicleBrand,
  selectAllVehicleModel
} from 'domain/models';
import {
  convertVehicleBrandData,
  convertVehicleBrandWhere,
  convertVehicleData,
  convertVehicleModelData,
  convertVehicleModelWhere,
  convertVehicleWhere
} from '../convert-data';
import { useDatabase } from 'data/hooks/use-database';

export const useDatabaseData = (): {
  transformApiResponseToDatabase: (
    entity: keyof SelectEntityMap,
    data: never,
    params: object & { ids?: { id?: number; apiId?: number } },
    pagination: { limit?: number; page?: number }
  ) => Promise<void>;
  findOnDatabase: (
    entity: keyof SelectEntityMap,
    params: object & { ids?: { id?: number; apiId?: number }; limit?: number; page?: number }
  ) => unknown;
} => {
  const database = useDatabase();

  const transformApiResponseToDatabase = async (
    entity: keyof SelectEntityMap,
    data: never,
    params: object & { ids?: { id?: number; apiId?: number } },
    pagination: { limit?: number; page?: number }
  ): Promise<void> => {
    const formattedData = data as unknown as { totalElements?: number; totalPages?: number };
    const hasPagination =
      formattedData &&
      typeof formattedData.totalElements === 'number' &&
      typeof formattedData.totalPages === 'number';

    switch (entity) {
      case 'vehicles':
        await database.upsert(entity, {
          ...convertVehicleData(data, params, hasPagination),
          ...pagination
        });
        break;
      case 'vehicle_models':
        await database.upsert(entity, {
          ...convertVehicleModelData(data, params, hasPagination),
          ...pagination
        });
        break;
      case 'vehicle_brands':
        await database.upsert(entity, {
          ...convertVehicleBrandData(data, params, hasPagination),
          ...pagination
        });
        break;
      default:
        break;
    }
  };

  const findOnDatabase = async (
    entity: keyof SelectEntityMap,
    {
      limit,
      page,
      ...params
    }: object & { ids?: { id?: number; apiId?: number }; limit?: number; page?: number }
  ): Promise<unknown> => {
    let content;
    let where = {};

    switch (entity) {
      case 'vehicles':
        where = convertVehicleWhere(params);

        content = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicle,
          where
        });
        break;
      case 'vehicle_models':
        where = convertVehicleModelWhere(params);

        content = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicleModel,
          where
        });
        break;
      case 'vehicle_brands':
        where = convertVehicleBrandWhere(params);

        content = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicleBrand,
          where
        });
        break;
      default:
        break;
    }

    if (limit && page) {
      const totalElements = await database.totalElements(entity, { where });
      const totalPages = Math.ceil(totalElements / limit);

      return { content, totalElements, totalPages };
    }

    return content;
  };

  return { findOnDatabase, transformApiResponseToDatabase };
};
