/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/init-declarations */
import { TableName } from 'domain/enums';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { store } from 'store';
import { useDatabase } from '../use-database';
import { useDatabaseData } from 'infra/db/use-database-data';
import type { ApiProps } from 'domain/protocol';
import type { CreateProps, SelectEntityMap } from 'domain/models';
import type { Ids } from 'domain/enums';
import type { QueryList } from 'main/config';
import type { queryProps } from 'infra/cache/queries/default-query';

interface makeRequestProps extends Omit<ApiProps, 'id' | 'isFormData' | 'queryParams'> {
  route: QueryList;
  ids?: Ids;
  apiRoute?: string;
}

export const useRequest = (): {
  findRequest: <T>(params: queryProps & { token?: string }) => Promise<T>;
  makeRequest: (params: makeRequestProps) => Promise<unknown>;
} => {
  const { transformApiResponseToDatabase, findOnDatabase } = useDatabaseData();
  const database = useDatabase();

  const findRequest = async <T>({
    route,
    apiRoute,
    ids,
    limit,
    page,
    token,
    params
  }: queryProps & { token?: string }): Promise<T> => {
    const { hasInternetConnection } = store.getState().netInfo;

    let data;
    const entity = TableName[route as keyof typeof TableName];

    if (hasInternetConnection) {
      data = await api.get({
        id: ids?.apiId,
        queryParams: { limit, page, ...params },
        route: apiRoute ?? apiPaths[route],
        token
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

    return data as T;
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
        body: `${JSON.stringify(body)}`,
        entity,
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
          data: { ...dataValue, entityId, requestId: undefined }
        });
      } else if (method === 'PUT' && ids?.id)
        if (ids?.apiId === null) {
          entityId = ids.id;
          await database.update('offline_queue', {
            data: {
              ...dataValue,
              method: 'POST',
              requestId: undefined
            },
            where: {
              entity: {
                operator: '=',
                value: entity
              },
              entityId: {
                operator: '=',
                value: ids.id
              }
            }
          });

          await database.update(entity, {
            data: body as CreateProps<keyof SelectEntityMap>,
            where: {
              id: {
                operator: '=',
                value: ids.id
              }
            }
          });
        } else {
          entityId = ids?.apiId ? ids?.apiId : ids?.id;
          await database.delete('offline_queue', {
            where: {
              entity: {
                operator: '=',
                value: entity
              },
              entityId: {
                operator: '=',
                value: entityId
              }
            }
          });
          await database.create('offline_queue', {
            data: { ...dataValue, entityId }
          });

          await database.update(entity, {
            data: { ...(body as object) },
            where: {
              apiId: {
                operator: '=',
                value: entityId
              }
            }
          });
        }
    }

    return data;
  };

  return { findRequest, makeRequest };
};
