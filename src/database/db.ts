import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "../constants/database";
import { initDatabase } from "./init";

let db: SQLite.SQLiteDatabase | null = null;
let initializing: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDB() {
  if (db) return db;
  if (!initializing) {
    initializing = (async () => {
      const database = await SQLite.openDatabaseAsync(DATABASE_NAME);
      await initDatabase(database)
      db = database;
      return database;
    })();
  }

  return initializing;
}
