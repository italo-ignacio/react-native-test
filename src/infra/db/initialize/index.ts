import { type SQLiteDatabase, openDatabaseAsync } from 'expo-sqlite';
import { initializeTables } from '../tables';

export const initializeDatabase = async (database: SQLiteDatabase): Promise<void> => {
  await database.execAsync('PRAGMA foreign_keys = ON;');
  await database.execAsync('PRAGMA busy_timeout = 10000;');

  openDatabaseAsync('database.db', {
    enableCRSQLite: true,
    enableChangeListener: true,
    finalizeUnusedStatementsBeforeClosing: true,
    useNewConnection: true
  });
  for await (const table of initializeTables) await database.execAsync(table);
};
