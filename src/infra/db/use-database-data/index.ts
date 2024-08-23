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
import { useDatabase } from 'data/hooks';
import { useDispatch } from 'react-redux';

export const useDatabaseData = (): {
  transformApiResponseToDatabase: (entity: keyof SelectEntityMap, data: never) => void;
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

  const transformApiResponseToDatabase = (entity: keyof SelectEntityMap, data: never): void => {
    switch (entity) {
      case 'vehicles':
        database.upsertData(entity, { data: convertVehicleData(data) });
        break;
      case 'vehicle_models':
        if (shouldSynchronize(synchronizeApiData.vehicleModel, 1)) {
          database.upsertData(entity, { data: convertVehicleModelData(data) });
          dispatch(setSynchronizeApiData({ vehicle: new Date() }));
        }
        break;
      case 'vehicle_brands':
        if (shouldSynchronize(synchronizeApiData.vehicleBrand, 1)) {
          database.upsertData(entity, { data: convertVehicleBrandData(data) });
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
    let dataValue;

    switch (entity) {
      case 'vehicles':
        dataValue = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicle,
          where: { ...params }
        });
        break;
      case 'vehicle_models':
        dataValue = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicleModel,
          where: { ...params }
        });
        break;
      case 'vehicle_brands':
        dataValue = await database.find(entity, {
          limit,
          page,
          select: selectAllVehicleBrand,
          where: { ...params }
        });
        break;
      default:
        break;
    }

    return dataValue;
  };

  return { findOnDatabase, transformApiResponseToDatabase };
};
