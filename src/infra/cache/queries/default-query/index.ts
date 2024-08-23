/* eslint-disable @typescript-eslint/init-declarations */
import { QueryName, apiPaths } from 'main/config';
import { TableName } from 'domain/enums';
import { api } from 'infra/http';
import { useAppSelector } from 'store';
import { useDatabaseData } from 'infra/db';
import { useQuery } from 'react-query';
import type { QueryList } from 'main/config';
import type { SelectEntityMap } from 'domain/models';
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
}: queryProps): UseQueryResult<T> => {
  const { transformApiResponseToDatabase, findOnDatabase } = useDatabaseData();
  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  return useQuery([QueryName[route], id, page, Object.values(params ?? {})], async () => {
    let data;
    const entity = TableName[route as keyof typeof TableName];

    if (hasInternetConnection) {
      data = await api.get({
        id,
        queryParams: { limit: limit ?? 30, page, ...params },
        route: apiPaths[route]
      });
      if (entity) transformApiResponseToDatabase(entity as keyof SelectEntityMap, data as never);
    } else if (!hasInternetConnection && entity)
      data = await findOnDatabase(entity as keyof SelectEntityMap, { limit, page });

    return data;
  });
};
