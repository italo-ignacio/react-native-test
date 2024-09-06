import type { CreateProps, OfflineQueue, SelectEntityMap } from 'domain/models';
import type { Ids } from 'domain/enums';
import type { useDatabaseReturn } from '../use-database';

const replaceOfflineQueue = async ({
  database,
  entity,
  entityId,
  dataValue
}: {
  database: useDatabaseReturn;
  entityId?: number;
  entity: keyof SelectEntityMap;
  dataValue: Omit<OfflineQueue, 'id'>;
}): Promise<void> => {
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
};

export const postMethodRequest = async ({
  database,
  entity,
  body,
  dataValue
}: {
  database: useDatabaseReturn;
  body: unknown;
  entity: keyof SelectEntityMap;
  dataValue: Omit<OfflineQueue, 'id'>;
}): Promise<void> => {
  const localItem = await database.create(entity, {
    data: body as CreateProps<keyof SelectEntityMap>,
    select: { id: true }
  });

  const entityId = localItem.id;

  if (entityId)
    await database.create('offline_queue', {
      data: { ...dataValue, entityId, requestId: undefined }
    });
};

export const deleteMethodRequest = async ({
  database,
  ids,
  entity,
  dataValue
}: {
  ids: Ids;
  database: useDatabaseReturn;
  entity: keyof SelectEntityMap;
  dataValue: Omit<OfflineQueue, 'id'>;
}): Promise<void> => {
  const entityId = ids?.apiId ? ids?.apiId : ids?.id;

  await replaceOfflineQueue({ dataValue, database, entity, entityId });

  await database.delete(entity, {
    where: {
      apiId: {
        operator: '=',
        value: entityId
      }
    }
  });
};

export const putMethodRequest = async ({
  database,
  ids,
  body,
  entity,
  dataValue
}: {
  ids?: Ids;
  database: useDatabaseReturn;
  entity: keyof SelectEntityMap;
  dataValue: Omit<OfflineQueue, 'id'>;
  body: unknown;
}): Promise<void> => {
  const entityId = ids?.apiId ? ids?.apiId : ids?.id;

  if (ids?.apiId === null)
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
  else await replaceOfflineQueue({ dataValue, database, entity, entityId });

  await database.update(entity, {
    data: body as CreateProps<keyof SelectEntityMap>,
    where: ids?.apiId
      ? {
          apiId: {
            operator: '=',
            value: entityId
          }
        }
      : {
          id: {
            operator: '=',
            value: entityId
          }
        }
  });
};
