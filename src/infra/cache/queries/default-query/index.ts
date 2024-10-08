/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/init-declarations */
import { QueryName } from 'main/config';
import { useQuery } from 'react-query';
import { useRequest } from 'data/hooks';
import type { Ids } from 'domain/enums';
import type { QueryList } from 'main/config';
import type { UseQueryResult } from 'react-query';

export interface useFindQueryProps {
  page?: number;
  limit?: number;
  params?: object;
  ids?: Ids;
}

export interface queryProps extends useFindQueryProps {
  route: QueryList;
  apiRoute?: string;
}

export const useFindQuery = <T>({
  page,
  params,
  ids,
  limit,
  apiRoute,
  route
}: queryProps): UseQueryResult<T> => {
  const { findRequest } = useRequest();

  return useQuery(
    [QueryName[route], Object.values(ids ?? {}), page, Object.values(params ?? {})],
    async () => {
      return await findRequest({ apiRoute, ids, limit, page, params, route });
    }
  );
};
