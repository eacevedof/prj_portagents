import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'

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

const DB_NAME = "portagent.db"

const db = SQLite.openDatabase(DB_NAME)

export const get_uuid = () => {
  var result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result

}

const get_rnd = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const get_uuid4 = () => {
  const maxlength = 14
  
  const ar = [
    "abcdefghijklmnopqrstuvxyz",
    "0123456789"
  ]

  const r = new Array(maxlength).fill(0).map(()=>{
    let i = get_rnd(0,1)
    let str = ar[i]
    str = get_rnd(0,1) ? str.toUpperCase() : str 
    const max = str.length - 1 
    i = get_rnd(0, max)
    return str.split("")[i]
  }).join("")

  return r
}

export const get_ymdhis = () => (new Date()).toISOString().replace(/T/,' ').replace(/\..+/,'')

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

const executeobj = (objex={sql:"",args:[],fn_ok:null,fn_nok:null}, objtr={fn_ok:null,fn_nok:null} ) => {
  
  const {sql, args, fn_ok, fn_nok} = objex
  const {fn_trok, fn_trnok} = objtr

  const fn_execute = tx => tx.executeSql(sql, args, fn_ok, fn_nok)
  db.transaction(fn_execute, fn_trnok, fn_trok)
}

// esto da error pq filesystem no está disponible para web
const get_location = async () => await FileSystem.getInfoAsync(`SQLite/${DB_NAME}`)
//const get_location = () => FileSystem.documentDirectory 
/*
The method or property expo-file-system.getInfoAsync is not available on web, 
are you sure you've linked all the native dependencies properly?
*/
//console.log("db path",get_location())
export default executeobj
