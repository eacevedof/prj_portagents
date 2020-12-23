import * as SQLite from 'expo-sqlite'
import uuid from 'react-native-uuid'

//https://docs.expo.io/versions/latest/sdk/sqlite/
/**
db.transaction(callback, error, success)Execute a database transaction.
Parameters
callback (function) -- A function representing the transaction to perform. Takes a Transaction (see below) as its only parameter, on which it can add SQL statements to execute.
error (function) -- Called if an error occured processing this transaction. Takes a single parameter describing the error.
success (function) -- Called when the transaction has completed executing on the database.


tx.executeSql(sqlStatement, arguments, success, error)Enqueue a SQL statement to execute in the transaction. Authors are strongly recommended to make use of the ? placeholder feature of the method to avoid against SQL injection attacks, and to never construct SQL statements on the fly.
Parameters
sqlStatement (string) -- A string containing a database query to execute expressed as SQL. The string may contain ? placeholders, with values to be substituted listed in the arguments parameter.
arguments (array) -- An array of values (numbers or strings) to substitute for ? placeholders in the SQL statement.
success (function) -- Called when the query is successfully completed during the transaction. Takes two parameters: the transaction itself, and a ResultSet object (see below) with the results of the query.
error (function) -- Called if an error occured executing this particular query in the transaction. Takes two parameters: the transaction itself, and the error object.

*/
const db = SQLite.openDatabase("portagent.db")

const get_uuid = () => uuid.v1()

const execute = (sql, params=[], fn_onerror=null, fn_onsuccess=null) => {
  //los parametros mejor en un objeto y hacer {a,b} = obj
  const fn_execute = tx => tx.executeSql(sql, params)
  db.transaction(fn_execute, fn_onerror, fn_onsuccess)
}

const query = (sql, params=[], fn_onload, fn_onerror, fn_onsuccess) => {
  //los parametros mejor en un objeto y hacer {a,b} = obj
  const fn_query = tx => tx.executeSql(sql, params, fn_onload)
  db.transaction(fn_query, fn_onerror, fn_onsuccess)
}

const executeobj = (objex={sql:"",args:[],fnsuccess:null,fnerror:null}, objtr={fnsuccess:null,fnerror:null} ) => {
  const {sql, args, fnsuccess, fnerror} = objex
  const {trsuccess, trerror} = objtr

  const fn_execute = tx => tx.executeSql(sql, args, fnsuccess, fnerror)
  db.transaction(fn_execute, trerror, trsuccess)
}

const queryobj = (objex={sql:"",args:[],fnsuccess:null,fnerror:null}, objtr={fnsuccess:null,fnerror:null} ) => {
  console.log("objex",objex)
  const {sql, args, fnsuccess, fnerror} = objex
  const {trsuccess, trerror} = objtr

  const fn_execute = tx => tx.executeSql(sql, args, fnsuccess, fnerror)
  db.transaction(fn_execute, trerror, trsuccess)
}



export const drop_table = () =>{
  const sql = `
  DROP TABLE IF EXISTS user;
  `
  //execute(sql)
}

export const create_table = ()=>{
  const sql = `
  CREATE TABLE IF NOT EXISTS user 
  (
      id integer primary key not null, 
      insert_date text,
      uuid text,
      done int
  );
  `
  execute(sql)  
}

export const insert = obj => {
  const sql = "INSERT INTO user (insert_date, uuid, done) VALUES (?,?,?)"
  const date = (new Date()).toString()
  const uuid = get_uuid()
  const arparam = [date, uuid, 0]
  execute(sql, arparam,e=>console.log("e.insert",e))
}

export const selectall = obj => {
  const sql = `
  SELECT * FROM user ORDER BY id DESC
  `

  const fn_loader = (objtx, r) => console.table(r.rows)
  //query(sql,[],fn_loader)
  queryobj({sql,args:[],fnsuccess:fn_loader})

}

export const remove = obj => {
  const sql = `
  DELETE FROM user WHERE id = ?
  `
  const arparam = [2]
  const fn_delete = tx  => tx.executeSql(sql, arparam)
  //db.transaction(fn_delete, e=>console.log("delete error",e), ()=>console.log("delete", sql, arparam))
  
  execute(sql, arparam)
}

export const update = obj => {
  const sql = `
  UPDATE user 
  SET uuid = ?
  WHERE id LIKE ?
  `
  const arparam = ["uuu","%3"]
  //const fn_update = tx  => tx.executeSql(sql, arparam)
  //db.transaction(fn_update, e=>console.log("update error",e), ()=>console.log("update", sql, arparam))
  execute(sql, arparam)
}

export default db
