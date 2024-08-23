import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

interface Default {
  test: string;
}

export const useFindDefaultQuery = ({ ...props }: useFindQueryProps): UseQueryResult<Default> =>
  useFindQuery<Default>({ ...props, route: 'default' });

export const useFindOneDefaultQuery = ({
  ...props
}: useFindQueryProps & { id: number | string }): UseQueryResult<Default> =>
  useFindQuery<Default>({ ...props, route: 'default' });
