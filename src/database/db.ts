import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "../constants/database";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDB() {
  if(!db){
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return db
}