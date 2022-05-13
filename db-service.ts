import {
    enablePromise,
    openDatabase,
    SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { RecordItem } from './src/models';

const tableName = 'recordsData';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'records.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, coords TEXT
      );`;

    await db.executeSql(query);
};

export const getRecords = async (db: SQLiteDatabase): Promise<RecordItem[]> => {
    try {
        const records: RecordItem[] = [];
        const results = await db.executeSql(
            `SELECT id,name,phone,coords FROM ${tableName}`,
        );
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                records.push(result.rows.item(index));
            }
        });
        return records;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get records');
    }
};

export const saveRecords = async (
    db: SQLiteDatabase,
    records: RecordItem[],
) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(rowid, name, phone, coords) VALUES ` +
        records.map(i => `(${i.id}, '${i.name}', '${i.phone}', '${i.coords}')`).join(',');

    return db.executeSql(insertQuery);
};

export const deleteRecordItem = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
};
