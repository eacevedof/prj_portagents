import executeobj, {get_uuid, get_ymdhis} from "../../infrastructure/db"

export const drop_table = () =>{
    const sql = `
    DROP TABLE IF EXISTS base_user;
    `
    const fn_onsuccess = (objtr, r) => {console.log("drop_table: objtr",objtr,"resulset"); console.table(r.rows)}
    executeobj({sql, fnsuccess:fn_onsuccess})
  }
  
export const create_table = ()=>{
  const sql = `
  CREATE TABLE IF NOT EXISTS base_user 
  (
      id integer primary key not null, 
      insert_date text,
      uuid text,
      name text,
      email text,
      phone text,
      password text
  );
  `
  //execute(sql)
  const fn_onsuccess = (objtr, r) => {console.log("create_table: objtr",objtr,"resulset",r); console.table(r.rows)}
  executeobj({sql, fnsuccess:fn_onsuccess})
}

export const insert = obj => {
  const sql = "INSERT INTO base_user (insert_date, uuid, name, email, phone, password) VALUES (?,?,?,?,?,?)"
  const date = get_ymdhis()
  const uuid = get_uuid()
  const args = [date, uuid, obj.name, obj.email, obj.phone, obj.password]
  //execute(sql, arparam,e=>console.log("e.insert",e))
  //const fn_onsuccess = (objtr, r) => {console.log("insert.success: objtr",objtr,"resulset",r); console.table(r.rows)}
  //query(sql,[],fn_loader)
  //alert("xxx")
  executeobj({sql,args, fnsuccess:obj.fn})  
}

export const selectall1 = () => {
  const sql = `
  SELECT * FROM base_user ORDER BY id DESC
  `
  const fn_onsuccess = (objtr, r) => {console.log("selectall1.success: objtr",objtr,"resulset",r); console.table(r.rows)}
  //query(sql,[],fn_loader)
  executeobj({sql, fnsuccess: fn_onsuccess})
}

export const selectall = (obj) => {
  const sql = `
  SELECT * FROM base_user ORDER BY id DESC
  `
  executeobj({sql, fnsuccess: obj.fn})
}

export const selectallfn = (fnok, fnnok=null) => {
  const sql = `
  SELECT * FROM base_user ORDER BY id DESC
  `
  executeobj({sql, fnsuccess: fnok, fnerror: fnnok})
}


export const selectdetail = (id, fnok, fnnok=null) => {
  const sql = `
  SELECT * 
  FROM base_user 
  WHERE 1=1
  AND id = ?
  `
  executeobj({sql, args:[id], fnsuccess: fnok, fnerror: fnnok})
}

export const remove = obj => {
  const sql = `
  DELETE FROM base_user WHERE id = ?
  `
  const args = [2]
  const fn_onsuccess = (objtr, r) => {console.log("remove.success: objtr",objtr,"resulset",r); console.table(r.rows)}
  executeobj({sql, args, fnsuccess:fn_onsuccess})
}

export const empty_base_user = obj => {
  const sql = `
  DELETE FROM base_user WHERE 1
  `
  const args = []
  const fn_onsuccess = (objtr, r) => {console.log("remove.success: objtr",objtr,"resulset",r); console.table(r.rows)}
  executeobj({sql, args, fnsuccess:fn_onsuccess})  
}

export const updatefn = (user, fnok, fnnok=null) => {
  const sql = `
  UPDATE base_user 
  SET  name = ?,
  email = ?,
  phone = ?,
  password = ?,

  WHERE 1=1
  AND id = ?
  `
  const args = [user.name, user.email, user.phone, user.password, user.id]
  executeobj({sql, args, fnsuccess:fnok, fnerror: fnok})
}



export const update = obj => {
  const sql = `
  UPDATE base_user 
  SET  = ?
  WHERE 1=1
  AND id LIKE ?
  `
  const args = ["uuu","%3"]
  //const fn_update = tx  => tx.executeSql(sql, arparam)
  //db.transaction(fn_update, e=>console.log("update error",e), ()=>console.log("update", sql, arparam))
  //execute(sql, arparam)
  const fn_onsuccess = (objtr, r) => {console.log("update.success: objtr",objtr,"resulset",r); console.table(r.rows)}
  executeobj({sql, args, fnsuccess:fn_onsuccess})
}
