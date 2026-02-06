import { SQLiteDatabase } from "expo-sqlite";



export const initDatabase = async (db: SQLiteDatabase) => {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS shopping(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            checked INTEGER default 0
        );

        CREATE TABLE IF NOT EXISTS pending(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            checked INTEGER default 0
        );
    `);
}