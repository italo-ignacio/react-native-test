/* eslint-disable @typescript-eslint/init-declarations */
import { TableName } from 'domain/enums';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { useAppSelector } from 'store';
import { useDatabaseData } from 'infra/db/use-database-data';
import type { SelectEntityMap } from 'domain/models';
import type { queryProps } from 'infra/cache/queries/default-query';

export const useMakeRequest = (): {
  makeRequest: (params: queryProps) => Promise<unknown>;
} => {
  const { transformApiResponseToDatabase, findOnDatabase } = useDatabaseData();
  const { hasInternetConnection } = useAppSelector((state) => state.netInfo);

  const makeRequest = async ({ route, id, limit, page, params }: queryProps): Promise<unknown> => {
    let data;
    const entity = TableName[route as keyof typeof TableName];

    if (hasInternetConnection) {
      data = await api.get({
        id,
        queryParams: { limit, page, ...params },
        route: apiPaths[route]
      });
      if (entity)
        await transformApiResponseToDatabase(
          entity as keyof SelectEntityMap,
          data as never,
          params ?? {},
          { limit, page }
        );
    } else if (!hasInternetConnection && entity)
      data = await findOnDatabase(entity as keyof SelectEntityMap, { ...params, limit, page });

    return data;
  };

  return { makeRequest };
};
