import * as SQLite from 'expo-sqlite'
import uuid from 'react-native-uuid'


const db = SQLite.openDatabase("portagent.db")


export const create_table = ()=>{
  const sql = `
  CREATE TABLE IF NOT EXISTS user 
  (
      id integer primary key not null, 
      done int, 
      uuid text
  );
  `
  console.log("sql:",sql)
  db.transaction(tx => tx.executeSql(sql))
}

export const insert = obj => {
  const sql = `
  INSERT INTO user (done, uuid) VALUES (0,?)
  `
  const uuid = get_uuid()
  const fn_insert = tx => tx.executeSql(sql, [ ])
  db.transaction(fn_insert, null, uuid)

  /*
  db.transaction(
      tx => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [ ]);
        tx.executeSql("select * from items", [], 
          (_, { rows }) => console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
  )
  */
}

export const selectall = obj => {
  const sql = `
  SELECT * FROM user
  `
  const fn_select = tx => tx.executeSql(sql, [ ])
  const fn_loader = (_, { rows }) => console.log(sql, JSON.stringify(rows))
  
  db.transaction(fn_select, null, fn_loader)
}

export const get_uuid = () => uuid.v1()

export default db

