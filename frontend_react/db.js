import * as SQLite from 'expo-sqlite'
import uuid from 'react-native-uuid'


const db = SQLite.openDatabase("portagent.db")


export const create_table = ()=>{
  const sql1 = `
  DROP TABLE IF EXISTS user;
  `

  const sql = `
  CREATE TABLE IF NOT EXISTS user 
  (
      id integer primary key not null, 
      insert_date text,
      uuid text,
      done int
  );
  `
  console.log("sql:",sql)
  db.transaction(tx => tx.executeSql(sql))
}

export const insert = obj => {
  const sql = "INSERT INTO user (insert_date, uuid, done) VALUES (?,?,?)"
  const date = (new Date()).toString()
  const uuid = get_uuid()

  const arparam = [date, uuid, 0]
  const fn_insert = tx => tx.executeSql(sql, arparam)

  db.transaction(fn_insert, null, ()=>console.log("inserted",sql,arparam))
}

export const selectall = obj => {
  const sql = `
  SELECT * FROM user ORDER BY id DESC
  `

  const fn_loader = (_, { rows }) => console.table(rows)
  const fn_select = tx  => tx.executeSql(sql, [], fn_loader)

  db.transaction(fn_select, null, ()=>console.log("select"))
}

export const get_uuid = () => uuid.v1()

export default db

