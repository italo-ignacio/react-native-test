import { useFindQuery } from 'infra/cache/queries/default-query';
import type { FindVehicleBrandResponse, VehicleBrand } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindVehicleBrandQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindVehicleBrandResponse> =>
  useFindQuery<FindVehicleBrandResponse>({ ...props, route: 'vehicleBrand' });

export const useFindOneVehicleBrandQuery = ({
  ...props
}: useFindQueryProps & { id: number | string }): UseQueryResult<VehicleBrand> =>
  useFindQuery<VehicleBrand>({ ...props, route: 'vehicleBrand' });
