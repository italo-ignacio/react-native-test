import { databaseValues } from 'main/utils';
import { useSQLiteContext } from 'expo-sqlite';
import type { CreateEntityMap } from 'domain/models/database';
import type { DatabaseEntity, ModelReturn } from 'domain/enums';

interface useDatabaseReturn {
  create: <T extends DatabaseEntity>(
    entity: T,
    values: CreateEntityMap[T],
    toReturn?: ModelReturn
  ) => Promise<void>;
}

export const useDatabase = (): useDatabaseReturn => {
  const database = useSQLiteContext();

  const create = async <T extends DatabaseEntity>(
    entity: T,
    values: CreateEntityMap[T],
    toReturn?: ModelReturn
  ): Promise<void> => {
    const { columns, queryValues } = databaseValues(values);

    const query = `
      INSERT INTO ${entity} (${columns}) VALUES (${queryValues})
    `;

    console.log(toReturn);

    console.log(query);

    try {
      await database.execAsync(query);
    } catch (error) {
      console.error('Error inserting data into database:', error);
    }
  };

  return { create };
};
