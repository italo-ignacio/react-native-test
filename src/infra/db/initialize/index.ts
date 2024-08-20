import { initializeTables } from '../tables';
import type { SQLiteDatabase } from 'expo-sqlite';

export const initializeDatabase = async (database: SQLiteDatabase): Promise<void> => {
  await database.execAsync('PRAGMA foreign_keys = ON');

  for await (const table of initializeTables) await database.execAsync(table);
};
