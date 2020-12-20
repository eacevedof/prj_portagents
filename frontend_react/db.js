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
  INSERT INTO user (done, uuid) VALUES (?,?)
  `
  const uuid = get_uuid()
  //const fn_insert = tx => tx.executeSql(sql, [ ])

  //db.transaction(tx => fn_insert(tx), [uuid], ()=> console.log("success"),(a,b)=>console.log(a,b))
  
  /*
  db.transaction(tx => {
      tx => tx.executeSql(sql, [0, uuid])
      tx.executeSql("select * from user", [], 
        (_, { rows }) => console.log("all",JSON.stringify(rows))
      )
    },
    null, ()=>console.log("inerted 1")
  )
  */
  
  /**/ 
  db.transaction(
      tx => {
        tx.executeSql("insert into user (done, value) values (?, ?)", [0,uuid]);
        tx.executeSql("select * from user", [], 
          (_, { rows }) => console.log("all",JSON.stringify(rows))
        );
      },
      null,
      ()=>console.log("inserted ^^")
  )
  /**/
}

export const selectall = obj => {
  const sql = `
  SELECT * FROM user
  `
  //const fn_select = tx  => tx.executeSql(sql, [ ])
  const fn_loader = (_, { rows }) => console.log(sql, JSON.stringify(rows))
  
  //db.transaction(fn_select, null, fn_loader)
  db.transaction(tx => {
    tx  => tx.executeSql(sql, [], (_, { rows }) => console.log(sql, JSON.stringify(rows)))
  }, null, ()=>console.log("select"))
}

export const get_uuid = () => uuid.v1()

export default db

