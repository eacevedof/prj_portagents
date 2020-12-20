import * as SQLite from 'expo-sqlite'
import uuid from 'react-native-uuid'


const db = SQLite.openDatabase("portagent.db")


export const create_table = ()=>{
    const sql = `
    CREATE TABLE IF NOT EXISTS user 
    (
        id integer primary key not null, 
        done int, 
        value text
    );
    `
    console.log("sql:",sql)
    db.transaction(tx => tx.executeSql(sql))
}

export const get_uuid = () => uuid.v1()

export default db

