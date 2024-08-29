import { apiPaths } from 'main/config';
import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseQueryResult } from 'react-query';
import type { VehicleModel } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindVehicleModelQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<VehicleModel[]> =>
  useFindQuery<VehicleModel[]>({ ...props, route: 'vehicleModel' });

export const useFindVehicleModelByBrandQuery = ({
  params: { apiBrandId },
  ...props
}: useFindQueryProps & {
  params: {
    brandId?: number;
    apiBrandId?: number;
  };
}): UseQueryResult<VehicleModel[]> =>
  useFindQuery<VehicleModel[]>({
    ...props,
    apiRoute: apiPaths.vehicleModelByBrand(apiBrandId),
    route: 'vehicleModel'
  });

export const useFindOneVehicleModelQuery = ({
  ...props
}: useFindQueryProps & { ids: { id?: number; apiId?: number } }): UseQueryResult<VehicleModel> =>
  useFindQuery<VehicleModel>({ ...props, route: 'vehicleModel' });
