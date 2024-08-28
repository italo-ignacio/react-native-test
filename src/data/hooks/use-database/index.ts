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
  upsertData: <T extends keyof SelectEntityMap>(
    entity: T,
    props: { data: UpdateProps<T>[] }
  ) => Promise<void>;
  totalElements: <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T> }
  ) => Promise<number>;
}

export const useDatabase = (): useDatabaseReturn => {
  const database = useSQLiteContext();

  const findFirst = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T>; select?: SelectProps<T> }
  ): Promise<SelectEntityReturnMap[T]> => {
    let result: SelectEntityReturnMap[T] | null = null;

    const { selectColumns, joinColumns } = databaseSelectColumns(entity, options?.select);
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const selectQuery = `
        SELECT ${selectColumns} FROM ${entity} ${joinColumns} ${whereData}
      `;

    result = await database.getFirstAsync(selectQuery);

    return formatResult(result, options?.select) as SelectEntityReturnMap[T];
  };

  const find = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: Partial<PaginationProps> & { where?: WhereProps<T>; select?: SelectProps<T> }
  ): Promise<SelectEntityReturnMap[T][]> => {
    const { selectColumns, joinColumns } = databaseSelectColumns(entity, options?.select);
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const limit = options?.limit;
    const page = options?.page ?? 1;
    const pagination = limit ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : '';

    const selectQuery = `
      SELECT ${selectColumns} FROM ${entity} ${joinColumns} ${whereData} ${pagination}
    `;

    const result = await database.getAllAsync(selectQuery);

    return formatListResult(result, options?.select) as SelectEntityReturnMap[T][];
  };

  const totalElements = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T> }
  ): Promise<number> => {
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const selectQuery = `SELECT COUNT(${entity}.id) as count FROM ${entity} ${whereData};`;

    const result = (await database.getFirstAsync(selectQuery)) as unknown as { count: number };

    return result.count;
  };

  const create = async <T extends keyof SelectEntityMap>(
    entity: T,
    { data, select }: { data: CreateProps<T>; select?: SelectProps<T> }
  ): Promise<SelectEntityReturnMap[T]> => {
    const { columns, queryValues } = databaseValues(data);

    const query = `
      INSERT INTO ${entity} (${columns}) VALUES (${queryValues.map(
      (item) => `${typeof item === 'number' ? item : `"${item}"`}`
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
    const { whereData } = databaseWhereTransform(entity, props?.where);

    const query = `
      UPDATE ${entity} SET ${Object.keys(props.data).map((item) => {
      const itemValue = props.data[item as keyof UpdateProps<T>];

      return `${item} = ${typeof itemValue === 'number' ? itemValue : `"${itemValue}"`}`;
    })}, updatedAt = CURRENT_TIMESTAMP ${whereData}
    `;

    await database.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.execAsync(query);
    });
  };

  const upsertData = async <T extends keyof SelectEntityMap>(
    entity: T,
    {
      data,
      where,
      ...params
    }: Partial<PaginationProps> & { data: UpdateProps<T>[]; where?: WhereProps<T> }
  ): Promise<void> => {
    const { columns } = databaseValues(data[0]);
    const { whereData } = databaseWhereTransform(entity, where);

    const limit = params?.limit;
    const page = params?.page ?? 1;
    const pagination = limit ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : '';

    const formattedWhere = `AND apiId IN (SELECT apiId FROM ${entity} ${whereData} ${pagination})`;

    const apiIds = data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => item.apiId)
      .join(', ');

    const deleteQuery = `DELETE FROM ${entity} WHERE apiId NOT IN (${apiIds}) ${formattedWhere}`;

    const datass = `SELECT apiId FROM ${entity} ${whereData} ${pagination}`;

    const valuess = await database.getAllAsync(datass);

    console.log('bbbbbbbbbbbbbbbbbbbbbbb');
    console.log(deleteQuery);

    console.log(
      apiIds
        .split(',')
        .map((item) => Number(String(item).replace(/ /gu, '')))
        .sort((first, second) => first > second),
      apiIds.split(',').length
    );
    console.log(
      valuess.map((item) => item.apiId).sort((first, second) => first > second),
      valuess.map((item) => item.apiId).length
    );
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    await database.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.execAsync(deleteQuery);
    });

    const values = data
      .map(
        (dataItem) =>
          `(${Object.values(dataItem)
            .map((itemValue) =>
              typeof itemValue === 'number'
                ? itemValue
                : `${String(itemValue).startsWith('SELECT') ? `(${itemValue})` : `"${itemValue}"`}`
            )
            .join(', ')})`
      )
      .join(', ');

    const updateColumns = Object.keys(data[0])
      .filter((item) => item !== 'apiId')
      .map((item) => `${item} = excluded.${item}`)
      .join(', ');

    const query = `
      INSERT INTO ${entity} (${columns}) 
      VALUES ${values} 
      ON CONFLICT(apiId) DO UPDATE SET ${updateColumns}, updatedAt = CURRENT_TIMESTAMP;
    `;

    await database.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.execAsync(query);
    });
  };

  const createMany = async <T extends keyof SelectEntityMap>(
    entity: T,
    { data }: { data: CreateProps<T>[] }
  ): Promise<void> => {
    const { columns } = databaseValues(data[0]);

    const query = `
      INSERT INTO ${entity} (${columns}) VALUES ${data.map(
      (item, index) =>
        `(${Object.values(item).map(
          (itemValue) => `${typeof itemValue === 'number' ? itemValue : `"${itemValue}"`}`
        )}) ${index + 1 === data.length ? ';' : ''}`
    )}
    `;

    await database.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.execAsync(query);
    });
  };

  const deleteData = async <T extends keyof SelectEntityMap>(
    entity: T,
    options?: { where?: WhereProps<T> }
  ): Promise<void> => {
    const { whereData } = databaseWhereTransform(entity, options?.where);

    const query = `
      DELETE FROM ${entity} ${whereData}
    `;

    await database.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.execAsync(query);
    });
  };

  return {
    create,
    createMany,
    delete: deleteData,
    find,
    findFirst,
    totalElements,
    update,
    upsertData
  };
};
