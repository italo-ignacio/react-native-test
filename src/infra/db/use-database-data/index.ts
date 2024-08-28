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
  convertVehicleData,
  convertVehicleModelData
} from '../convert-data';
import { setSynchronizeApiData } from 'store/persist/slice';
import { useAppSelector } from 'store';
import { useDatabase } from 'data/hooks/use-database';
import { useDispatch } from 'react-redux';

export const useDatabaseData = (): {
  transformApiResponseToDatabase: (
    entity: keyof SelectEntityMap,
    data: never,
    params: object,
    pagination: { limit?: number; page?: number }
  ) => Promise<void>;
  findOnDatabase: (
    entity: keyof SelectEntityMap,
    params: object & { limit?: number; page?: number }
  ) => unknown;
} => {
  const database = useDatabase();
  const dispatch = useDispatch();
  const { synchronizeApiData } = useAppSelector((state) => state.persist);

  const shouldSynchronize = (lastSync: Date | string | null, days: number): boolean => {
    const pastDate = new Date();

    pastDate.setDate(pastDate.getDate() - days);

    return lastSync === null || new Date(lastSync) < pastDate;
  };

  const transformApiResponseToDatabase = async (
    entity: keyof SelectEntityMap,
    data: never,
    params: object,
    pagination: { limit?: number; page?: number }
  ): Promise<void> => {
    const formattedData = data as unknown as { totalElements?: number; totalPages?: number };
    const hasPagination =
      formattedData &&
      typeof formattedData.totalElements === 'number' &&
      typeof formattedData.totalPages === 'number';

    switch (entity) {
      case 'vehicles':
        await database.upsertData(entity, {
          ...convertVehicleData(data, params, hasPagination),
          ...pagination
        });
        break;
      case 'vehicle_models':
        if (shouldSynchronize(synchronizeApiData.vehicleModel, 1)) {
          await database.upsertData(entity, {
            ...convertVehicleModelData(data, params, hasPagination),
            ...pagination
          });
          dispatch(setSynchronizeApiData({ vehicle: new Date() }));
        }
        break;
      case 'vehicle_brands':
        if (shouldSynchronize(synchronizeApiData.vehicleBrand, 1)) {
          await database.upsertData(entity, {
            ...convertVehicleBrandData(data, params, hasPagination),
            ...pagination
          });
          dispatch(setSynchronizeApiData({ vehicle: new Date() }));
        }
        break;
      default:
        break;
    }
  };

  const findOnDatabase = async (
    entity: keyof SelectEntityMap,
    { limit, page, ...params }: object & { limit?: number; page?: number }
  ): Promise<unknown> => {
    let content;

    switch (entity) {
      case 'vehicles':
        content = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicle,
          where: { ...params }
        });
        break;
      case 'vehicle_models':
        content = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicleModel,
          where: { ...params }
        });
        break;
      case 'vehicle_brands':
        content = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicleBrand,
          where: { ...params }
        });
        break;
      default:
        break;
    }

    if (limit && page) {
      const totalElements = await database.totalElements(entity, { where: { ...params } });
      const totalPages = Math.ceil(totalElements / limit);

      return { content, totalElements, totalPages };
    }

    return content;
  };

  return { findOnDatabase, transformApiResponseToDatabase };
};
