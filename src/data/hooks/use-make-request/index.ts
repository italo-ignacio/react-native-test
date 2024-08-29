/* eslint-disable @typescript-eslint/init-declarations */
import { TableName } from 'domain/enums';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { store } from 'store';
import { useDatabaseData } from 'infra/db/use-database-data';
import type { SelectEntityMap } from 'domain/models';
import type { queryProps } from 'infra/cache/queries/default-query';

export const useMakeRequest = (): {
  makeRequest: (params: queryProps) => Promise<unknown>;
} => {
  const { transformApiResponseToDatabase, findOnDatabase } = useDatabaseData();

  const makeRequest = async ({
    route,
    apiRoute,
    ids,
    limit,
    page,
    params
  }: queryProps): Promise<unknown> => {
    const { hasInternetConnection } = store.getState().netInfo;

    let data;
    const entity = TableName[route as keyof typeof TableName];

    if (hasInternetConnection) {
      data = await api.get({
        id: ids?.apiId,
        queryParams: { limit, page, ...params },
        route: apiRoute ?? apiPaths[route]
      });
      if (entity)
        await transformApiResponseToDatabase(
          entity as keyof SelectEntityMap,
          data as never,
          { ...params, ids },
          { limit, page }
        );
    } else if (!hasInternetConnection && entity)
      data = await findOnDatabase(entity as keyof SelectEntityMap, { ...params, ids, limit, page });

    return data;
  };

  return { makeRequest };
};
