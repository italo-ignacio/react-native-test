/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  databaseSelectColumns,
  databaseValues,
  databaseWhereTransform,
  formatListResult,
  formatResult
} from 'main/utils';
import { useSQLiteContext } from 'expo-sqlite';
import type {
  CreateProps,
  PaginationProps,
  SelectEntityMap,
  SelectEntityReturnMap,
  SelectProps,
  UpdateProps,
  WhereProps
} from 'domain/models';

interface useDatabaseReturn {
  create: <T extends keyof SelectEntityMap>(
    entity: T,
    props: { data: CreateProps<T>; select?: SelectProps<T> }
  ) => Promise<SelectEntityReturnMap[T]>;
  findFirst: <T extends keyof SelectEntityMap>(
    entity: T,
    props?: { where?: WhereProps<T>; select?: SelectProps<T> }
  ) => Promise<SelectEntityReturnMap[T]>;
  find: <T extends keyof SelectEntityMap>(
    entity: T,
    props?: Partial<PaginationProps> & { where?: WhereProps<T>; select?: SelectProps<T> }
  ) => Promise<SelectEntityReturnMap[T][]>;
  createMany: <T extends keyof SelectEntityMap>(
    entity: T,
    props: { data: CreateProps<T>[] }
  ) => Promise<void>;
  delete: <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T> }
  ) => Promise<void>;
  update: <T extends keyof SelectEntityMap>(
    entity: T,
    props: { data: UpdateProps<T>; where?: WhereProps<T> }
  ) => Promise<void>;
  upsert: <T extends keyof SelectEntityMap>(
    entity: T,
    props: { data: UpdateProps<T>[] }
  ) => Promise<void>;
  totalElements: <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T> }
  ) => Promise<number>;
  deleteTable: <T extends keyof SelectEntityMap>(entity: T) => Promise<void>;
  upsertOne: <T extends keyof SelectEntityMap>(
    entity: T,
    props: { data: UpdateProps<T>; conflict: string }
  ) => Promise<void>;
}

export const useDatabase = (): useDatabaseReturn => {
  const database = useSQLiteContext();

  const retryTransaction = async (
    fn: () => Promise<void>,
    retries = 5,
    delay = 1000
  ): Promise<void> => {
    try {
      await fn();
    } catch (error) {
      if (retries > 0) setTimeout(() => retryTransaction(fn, retries - 1, delay), delay);
      else throw error;
    }
  };

  const findFirst = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T>; select?: SelectProps<T> }
  ): Promise<SelectEntityReturnMap[T]> => {
    console.info('find first');
    let result: SelectEntityReturnMap[T] | null = null;

    const { selectColumns, joinColumns } = databaseSelectColumns(entity, options?.select);
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const selectQuery = `SELECT ${selectColumns} FROM ${entity} ${joinColumns} ${whereData}`;

    result = await database.getFirstAsync(selectQuery);

    return formatResult(result, options?.select) as SelectEntityReturnMap[T];
  };

  const find = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: Partial<PaginationProps> & { where?: WhereProps<T>; select?: SelectProps<T> }
  ): Promise<SelectEntityReturnMap[T][]> => {
    console.info('find');
    const { selectColumns, joinColumns } = databaseSelectColumns(entity, options?.select);
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const limit = options?.limit;
    const page = options?.page ?? 1;
    const pagination = limit ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : '';

    const selectQuery = `SELECT ${selectColumns} FROM ${entity} ${joinColumns} ${whereData} ORDER BY ${entity}.id ASC ${pagination}`;

    const result = await database.getAllAsync(selectQuery);

    return formatListResult(result, options?.select) as SelectEntityReturnMap[T][];
  };

  const totalElements = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T> }
  ): Promise<number> => {
    console.info('total elements');
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const selectQuery = `SELECT COUNT(${entity}.id) as count FROM ${entity} ${whereData};`;

    const result = (await database.getFirstAsync(selectQuery)) as unknown as { count: number };

    return result.count;
  };

  const create = async <T extends keyof SelectEntityMap>(
    entity: T,
    { data, select }: { data: CreateProps<T>; select?: SelectProps<T> }
  ): Promise<SelectEntityReturnMap[T]> => {
    console.info('create');
    const { columns, queryValues } = databaseValues(data);

    const query = `
      INSERT INTO ${entity} (${columns}) VALUES (${queryValues.map(
      (item) => `${typeof item === 'number' ? item : `'${item}'`}`
    )})
    `;

    await database.execAsync(query);

    if (select && Object.keys(select).length > 0) {
      const { selectColumns, joinColumns } = databaseSelectColumns(entity, select);

      const selectQuery = `
        SELECT ${selectColumns} FROM ${entity} ${joinColumns} WHERE ${entity}.id = last_insert_rowid() 
      `;

      const result = await database.getFirstAsync(selectQuery);

      return formatResult(result, select) as SelectEntityReturnMap[T];
    }

    return undefined as unknown as SelectEntityReturnMap[T];
  };

  const update = async <T extends keyof SelectEntityMap>(
    entity: T,
    props: { data: UpdateProps<T>; where?: WhereProps<T> }
  ): Promise<void> => {
    console.info('update');
    const { whereData } = databaseWhereTransform(entity, props?.where);

    const query = `
      UPDATE ${entity} SET ${Object.keys(props.data).map((item) => {
      const itemValue = props.data[item as keyof UpdateProps<T>];

      return `${item} = ${typeof itemValue === 'number' ? itemValue : `'${itemValue}'`}`;
    })}, updatedAt = CURRENT_TIMESTAMP ${whereData}
    `;

    await retryTransaction(async () => {
      if (await database.isInTransactionAsync()) throw new Error('Transaction in progress');
      else
        await database.withExclusiveTransactionAsync(async (transaction) => {
          await transaction.execAsync(query);
        });
    });
  };

  const upsert = async <T extends keyof SelectEntityMap>(
    entity: T,
    {
      data,
      where,
      ...params
    }: Partial<PaginationProps> & { data: UpdateProps<T>[]; where?: WhereProps<T> }
  ): Promise<void> => {
    console.info('upsert');

    if (data.length < 1) return;

    const { columns } = databaseValues(data[0]);
    const { whereData } = databaseWhereTransform(entity, where);

    const limit = params?.limit;
    const page = params?.page ?? 1;
    const pagination = limit ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : '';

    const formattedWhere = `AND apiId IN (SELECT apiId FROM ${entity} ${whereData} ORDER BY id ASC ${pagination})`;

    const apiIds = data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => item.apiId)
      .join(', ');

    const deleteQuery = `DELETE FROM ${entity} WHERE apiId IS NULL OR (apiId NOT IN (${apiIds}) ${formattedWhere})`;

    const values = data
      .map(
        (dataItem) =>
          `(${Object.values(dataItem)
            .map((itemValue) =>
              typeof itemValue === 'number'
                ? itemValue
                : `${String(itemValue).startsWith('SELECT') ? `(${itemValue})` : `'${itemValue}'`}`
            )
            .join(', ')})`
      )
      .join(', ');

    const updateColumns = Object.keys(data[0])
      .filter((item) => item !== 'apiId')
      .map((item) => `${item} = excluded.${item}`)
      .join(', ');

    const query = `INSERT INTO ${entity} (${columns}) VALUES ${values} ON CONFLICT(apiId) DO UPDATE SET ${updateColumns}, updatedAt = CURRENT_TIMESTAMP;`;

    await retryTransaction(async () => {
      if (await database.isInTransactionAsync()) throw new Error('Transaction in progress');
      else
        await database.withExclusiveTransactionAsync(async (transaction) => {
          await transaction.execAsync(`${deleteQuery};${query}`);
        });
    });
  };

  const upsertOne = async <T extends keyof SelectEntityMap>(
    entity: T,
    { data, conflict }: { data: UpdateProps<T>; conflict: string }
  ): Promise<void> => {
    console.info('upsert one ');

    const { columns, queryValues } = databaseValues(data);

    const updateColumns = Object.keys(data)
      .filter((item) => item !== 'apiId')
      .map((item) => `${item} = excluded.${item}`)
      .join(', ');

    const query = `
      INSERT INTO ${entity} (${columns}) VALUES (${queryValues.map(
      (item) => `${typeof item === 'number' ? item : `'${item}'`}`
    )}) ON CONFLICT(${conflict}) DO UPDATE SET ${updateColumns}, updatedAt = CURRENT_TIMESTAMP;
    `;

    await retryTransaction(async () => {
      if (await database.isInTransactionAsync()) throw new Error('Transaction in progress');
      else
        await database.withExclusiveTransactionAsync(async (transaction) => {
          await transaction.execAsync(query);
        });
    });
  };

  const createMany = async <T extends keyof SelectEntityMap>(
    entity: T,
    { data }: { data: CreateProps<T>[] }
  ): Promise<void> => {
    console.info('create many');
    const { columns } = databaseValues(data[0]);

    const query = `
      INSERT INTO ${entity} (${columns}) VALUES ${data.map(
      (item, index) =>
        `(${Object.values(item).map(
          (itemValue) => `${typeof itemValue === 'number' ? itemValue : `'${itemValue}'`}`
        )}) ${index + 1 === data.length ? ';' : ''}`
    )}
    `;

    await retryTransaction(async () => {
      if (await database.isInTransactionAsync()) throw new Error('Transaction in progress');
      else
        await database.withExclusiveTransactionAsync(async (transaction) => {
          await transaction.execAsync(query);
        });
    });
  };

  const deleteData = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T> }
  ): Promise<void> => {
    console.info('delete');
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const query = `DELETE FROM ${entity} ${whereData}`;

    await retryTransaction(async () => {
      if (await database.isInTransactionAsync()) throw new Error('Transaction in progress');
      else
        await database.withExclusiveTransactionAsync(async (transaction) => {
          await transaction.execAsync(query);
        });
    });
  };

  const deleteTable = async <T extends keyof SelectEntityMap>(entity: T): Promise<void> => {
    console.info('delete table');

    const query = `DROP TABLE IF EXISTS ${entity}`;

    await retryTransaction(async () => {
      if (await database.isInTransactionAsync()) throw new Error('Transaction in progress');
      else
        await database.withExclusiveTransactionAsync(async (transaction) => {
          await transaction.execAsync(query);
        });
    });
  };

  return {
    create,
    createMany,
    delete: deleteData,
    deleteTable,
    find,
    findFirst,
    totalElements,
    update,
    upsert,
    upsertOne
  };
};
