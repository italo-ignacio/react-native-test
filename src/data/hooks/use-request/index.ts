/* eslint-disable @typescript-eslint/init-declarations */
import { TableName } from 'domain/enums';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { getOfflineUpdateWhere } from 'main/utils';
import { store } from 'store';
import { useDatabase } from '../use-database';
import { useDatabaseData } from 'infra/db/use-database-data';
import type { ApiProps } from 'domain/protocol';
import type { CreateProps, SelectEntityMap, UpdateProps } from 'domain/models';
import type { Ids } from 'domain/enums';
import type { QueryList } from 'main/config';
import type { queryProps } from 'infra/cache/queries/default-query';

interface makeRequestProps extends Omit<ApiProps, 'id' | 'isFormData' | 'queryParams'> {
  route: QueryList;
  ids?: Ids;
  apiRoute?: string;
}

export const useRequest = (): {
  findRequest: (params: queryProps) => Promise<unknown>;
  makeRequest: (params: makeRequestProps) => Promise<unknown>;
} => {
  const { transformApiResponseToDatabase, findOnDatabase } = useDatabaseData();
  const database = useDatabase();

  const findRequest = async ({
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

  const makeRequest = async ({
    route,
    apiRoute,
    body,
    ids,
    method
  }: makeRequestProps): Promise<unknown> => {
    const { hasInternetConnection } = store.getState().netInfo;

    let data;
    const entity = TableName[route as keyof typeof TableName] as keyof SelectEntityMap;

    if (hasInternetConnection)
      data = await api.request({
        body,
        id: ids?.apiId ? ids?.apiId : ids?.id,
        method,
        route: apiRoute ?? apiPaths[route]
      });
    else if (entity) {
      let entityId;

      const dataValue = {
        body,
        method,
        requestId: ids?.apiId ? ids?.apiId : ids?.id,
        route
      };

      if (method === 'POST') {
        const localItem = await database.create(entity, {
          data: body as CreateProps<keyof SelectEntityMap>,
          select: { id: true }
        });

        entityId = localItem.id;

        await database.create('offline_queue', {
          data: {
            ...dataValue,
            entityId
          }
        });
      } else if (method === 'PUT' && ids?.id) {
        if (ids?.apiId === null) {
          entityId = ids.id;
          await database.delete('offline_queue', {
            where: {
              entityId: {
                operator: '=',
                value: ids.id
              }
            }
          });

          await database.create('offline_queue', {
            data: {
              ...dataValue,
              entityId,
              method: 'POST'
            }
          });
        }

        const where = getOfflineUpdateWhere(ids);

        await database.update(entity, {
          data: body as UpdateProps<keyof SelectEntityMap>,
          where
        });
      }

      await database.create('offline_queue', {
        data: {
          body,
          entityId,
          method,
          requestId: ids?.apiId ? ids?.apiId : ids?.id,
          route
        }
      });
    }

    return data;
  };

  return { findRequest, makeRequest };
};
