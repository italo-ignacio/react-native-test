/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/init-declarations */
import { QueryName } from 'main/config';
import { useMakeRequest } from 'data/hooks';
import { useQuery } from 'react-query';
import type { QueryList } from 'main/config';
import type { UseQueryResult } from 'react-query';

export interface useFindQueryProps {
  page?: number;
  limit?: number;
  params?: object;
  id?: string;
}

export interface queryProps extends useFindQueryProps {
  route: QueryList;
}

export const useFindQuery = <T>({
  page,
  params,
  id,
  limit,
  route
}: queryProps): UseQueryResult<T> => {
  const { makeRequest } = useMakeRequest();

  return useQuery([QueryName[route], id, page, Object.values(params ?? {})], async () => {
    return await makeRequest({ id, limit, page, params, route });
  });
};
