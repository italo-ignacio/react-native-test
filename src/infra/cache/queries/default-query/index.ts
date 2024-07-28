import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { useQuery } from 'react-query';
import type { QueryList } from 'main/config';
import type { UseQueryResult } from 'react-query';

export interface useFindQueryProps {
  page?: number;
  limit?: number;
  params?: object;
  id?: string;
}

interface queryProps extends useFindQueryProps {
  route: QueryList;
}

export const useFindQuery = <T>({
  page,
  params,
  id,
  limit,
  route
}: queryProps): UseQueryResult<T> =>
  useQuery([QueryName[route], id, page, Object.values(params ?? {})], () =>
    api.get({
      id,
      queryParams: { limit: limit ?? 30, page, ...params },
      route: apiPaths[route]
    })
  );
