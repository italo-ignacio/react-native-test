import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseQueryResult } from 'react-query';
import type { Vehicle } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindVehicleQuery = ({ ...props }: useFindQueryProps): UseQueryResult<Vehicle[]> =>
  useFindQuery<Vehicle[]>({ ...props, route: 'vehicle' });

export const useFindOneVehicleQuery = ({
  ...props
}: useFindQueryProps & { ids: { id?: number; apiId?: number } }): UseQueryResult<Vehicle> =>
  useFindQuery<Vehicle>({ ...props, route: 'vehicle' });
