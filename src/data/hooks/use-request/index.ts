/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/init-declarations */
import { TableName } from 'domain/enums';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { deleteMethodRequest, postMethodRequest, putMethodRequest } from './methods';
import { setSynchronize } from 'store/net-info/slice';
import { store } from 'store';
import { useDatabase } from '../use-database';
import { useDatabaseData } from 'infra/db/use-database-data';
import { useDispatch } from 'react-redux';
import type { ApiProps } from 'domain/protocol';
import type { Ids } from 'domain/enums';
import type { QueryList } from 'main/config';
import type { SelectEntityMap } from 'domain/models';
import type { queryProps } from 'infra/cache/queries/default-query';

interface makeRequestProps extends Omit<ApiProps, 'id' | 'isFormData' | 'queryParams'> {
  route: QueryList;
  ids?: Ids;
  apiRoute?: string;
}

export const useRequest = (): {
  findRequest: <T>(params: queryProps & { token?: string }) => Promise<T>;
  makeRequest: (params: makeRequestProps) => Promise<unknown>;
  synchronizeDb: () => Promise<void>;
} => {
  const { transformApiResponseToDatabase, findOnDatabase } = useDatabaseData();
  const database = useDatabase();
  const dispatch = useDispatch();

  const retrySynchronize = async (
    fn: () => Promise<void>,
    retries = 3,
    delay = 500
  ): Promise<void> => {
    try {
      await fn();
    } catch (error) {
      if (retries > 0) setTimeout(() => retrySynchronize(fn, retries - 1, delay), delay);
      else throw error;
    }
  };

  const synchronizeDb = async (): Promise<void> => {
    const { hasInternetConnection, synchronize } = store.getState().netInfo;

    console.log('synchronizeDb');

    if (hasInternetConnection && synchronize.state !== 'isSynchronizing') {
      const hasQuery = await database.find('offline_queue');

      if (hasQuery.length) {
        const ids: number[] = [];

        dispatch(
          setSynchronize({
            countOfSynchronized: 0,
            state: 'isSynchronizing',
            totalToSynchronize: hasQuery.length
          })
        );

        let synchronized = 1;

        try {
          for await (const item of hasQuery) {
            await retrySynchronize(async (): Promise<void> => {
              await api.request({
                body:
                  String(item.body) === 'undefined' ? undefined : JSON.parse(item.body as string),
                id: String(item.requestId) === 'undefined' ? undefined : item.requestId,
                method: item.method,
                route: item.route
              });
            });
            ids.push(item.id);
            dispatch(
              setSynchronize({
                countOfSynchronized: synchronized,
                state: 'isSynchronizing',
                totalToSynchronize: hasQuery.length
              })
            );
            synchronized += 1;
          }
        } catch {
          // eslint-disable-next-line lines-around-comment
          /* */
        } finally {
          await database.delete('offline_queue', {
            where: {
              id: {
                operator: 'IN',
                value: `(${ids.join(',')})`
              }
            }
          });

          setTimeout((): void => {
            dispatch(
              setSynchronize({
                countOfSynchronized: null,
                state: 'finishedSyncing',
                totalToSynchronize: null
              })
            );
          }, 1000);
        }
      } else
        dispatch(
          setSynchronize({
            countOfSynchronized: null,
            state: 'nothingToSynchronize',
            totalToSynchronize: null
          })
        );
    }
  };

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
      const dataValue = {
        body: `${JSON.stringify(body)}`,
        entity,
        method,
        requestId: ids?.apiId ? ids?.apiId : ids?.id,
        route: apiRoute ?? apiPaths[route]
      };

      if (method === 'POST') await postMethodRequest({ body, dataValue, database, entity });
      else if (method === 'DELETE' && ids)
        await deleteMethodRequest({ dataValue, database, entity, ids });
      else if (method === 'PUT' && ids?.id)
        await putMethodRequest({ body, dataValue, database, entity, ids });
    }

    return data;
  };

  return { findRequest, makeRequest, synchronizeDb };
};
