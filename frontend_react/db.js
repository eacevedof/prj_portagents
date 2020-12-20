import * as SQLite from 'expo-sqlite'
import uuid from 'react-native-uuid'

//https://docs.expo.io/versions/latest/sdk/sqlite/
/**
 * db.transaction(callback, error, success)
 * tx.executeSql(sqlStatement, arguments, success, error)
 * 
 */


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

  db.transaction(tx => tx.executeSql(sql),e=>console.log("create table error",e),()=>console.log("create table",sql))
  
}

export const insert = obj => {
  const sql = "INSERT INTO user (insert_date, uuid, done) VALUES (?,?,?)"
  const date = (new Date()).toString()
  const uuid = get_uuid()

  const arparam = [date, uuid, 0]
  const fn_insert = tx => tx.executeSql(sql, arparam)

  db.transaction(fn_insert, e=>console.log("insert error",e), ()=>console.log("inserted:", sql, arparam))
}

export const selectall = obj => {
  const sql = `
  SELECT * FROM user ORDER BY id DESC
  `
  // parametros func: (ojbect-transaction, object-resultset con rows y rowsAffected)
  const fn_loader = (objtx, r) => console.table(r.rows)
  const fn_select = tx  => tx.executeSql(sql, [], fn_loader)

  db.transaction(fn_select, e=>console.log("select error",e), ()=>console.log("select", sql))
}

export const remove = obj => {
  const sql = `
  DELETE FROM user WHERE id = ?
  `
  const arparam = [2]
  const fn_delete = tx  => tx.executeSql(sql, arparam)
  db.transaction(fn_delete, e=>console.log("delete error",e), ()=>console.log("delete", sql, arparam))
}

export const update = obj => {
  const sql = `
  UPDATE user 
  SET uuid = ?
  WHERE id LIKE ?
  `
  const arparam = ["uuu","%3"]
  const fn_update = tx  => tx.executeSql(sql, arparam)
  db.transaction(fn_update, e=>console.log("update error",e), ()=>console.log("update", sql, arparam))
}


export const get_uuid = () => uuid.v1()

export default db
