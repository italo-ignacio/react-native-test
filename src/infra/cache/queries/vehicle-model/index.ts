import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseQueryResult } from 'react-query';
import type { VehicleModel } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindVehicleModelQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<VehicleModel[]> =>
  useFindQuery<VehicleModel[]>({ ...props, route: 'vehicleModel' });

export const useFindVehicleModelByBrandQuery = ({
  brandId,
  ...props
}: useFindQueryProps & { brandId: number | string }): UseQueryResult<VehicleModel[]> =>
  useFindQuery<VehicleModel[]>({ ...props, id: `${brandId}/vehicleModel`, route: 'vehicleModel' });

export const useFindOneVehicleModelQuery = ({
  ...props
}: useFindQueryProps & { id: number | string }): UseQueryResult<VehicleModel> =>
  useFindQuery<VehicleModel>({ ...props, route: 'vehicleModel' });
