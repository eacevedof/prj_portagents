import executeobj, {get_uuid, get_ymdhis, queryobj} from "../../infrastructure/db"

export const drop_table = () =>{
    const sql = `
    DROP TABLE IF EXISTS base_user;
    `
    console.log(sql)
    const fn_ok = (objtr, r) => {console.log("drop_table: objtr",objtr,"resulset"); console.log(r.rows)}
    executeobj({sql, fn_ok:fn_ok})
  }
  
export const create_table = ()=>{
  const sql = `
  CREATE TABLE IF NOT EXISTS base_user 
  (
      id integer primary key not null, 
      insert_date text,
      update_date text,
      uuid text,
      name text,
      email text,
      phone text,
      password text
  );
  `
  console.log(sql)
  //execute(sql)
  const fn_ok = (objtr, r) => {console.log("create_table: objtr",objtr,"resulset",r); console.log(r.rows)}
  executeobj({sql, fn_ok:fn_ok})
}

export const insert = obj => {
  const sql = "INSERT INTO base_user (insert_date, uuid, name, email, phone, password) VALUES (?,?,?,?,?,?)"
  const date = get_ymdhis()
  const uuid = get_uuid()
  const args = [date, uuid, obj.name, obj.email, obj.phone, obj.password]
  //execute(sql, arparam,e=>console.log("e.insert",e))
  //const fn_ok = (objtr, r) => {console.log("insert.success: objtr",objtr,"resulset",r); console.log(r.rows)}
  //query(sql,[],fn_loader)
  //alert("xxx")
  executeobj({sql, args, fn_ok:obj.fn})  
}

export const insertfn = (user, fnok, fnnok=null) => {
  const sql = `
  INSERT INTO base_user 
  (insert_date, uuid, name, email, phone, password) 
  VALUES 
  (?,?,?,?,?,?)
  `

  const date = get_ymdhis()
  const uuid = get_uuid()
  const args = [date, uuid, user.name, user.email, user.phone, user.password]

  console.log(sql, args)
  executeobj({sql, args, fn_ok:fnok, fn_nok:fnnok})  
}

export const selectall1 = () => {
  const sql = `
  SELECT * FROM base_user ORDER BY id DESC
  `
  const fn_ok = (objtr, r) => {console.log("selectall1.success: objtr",objtr,"resulset",r); console.log(r.rows)}
  //query(sql,[],fn_loader)
  executeobj({sql, fn_ok: fn_ok})
}

export const selectall = (obj) => {
  const sql = `
  SELECT * FROM base_user ORDER BY id DESC
  `
  executeobj({sql, fn_ok: obj.fn})
}

export const get_ids = async()=>{
  const sql = `
  SELECT * FROM base_user ORDER BY id DESC
  `
  //console.log(sql)
  //const r = await queryobj({sql, args:[]})
  try {
    const r = await queryobj(sql)
    const ar = Object.keys(r.rows).map(k => r.rows[k])
    console.log("ROOOOWWWWSSS",ar.filter( item => item.id>10))
    //r.rows.map( item => console.log(item))
    //console.log()
    return r.rows
  } 
  catch (error) {
    return error
  }
  
}


export const selectallfn = (fnok, fnnok=null) => {
  const sql = `
  SELECT * FROM base_user ORDER BY id DESC
  `
  console.log(sql)
  executeobj({sql, fn_ok: fnok, fn_nok: fnnok})
}


export const selectdetail = (id, fnok, fnnok=null) => {
  const sql = `
  SELECT * 
  FROM base_user 
  WHERE 1=1
  AND id = ?
  `
  const args = [id]
  console.log(sql, args)
  executeobj({sql, args, fn_ok: fnok, fn_nok: fnnok})
}

export const remove = obj => {
  const sql = `
  DELETE FROM base_user WHERE id = ?
  `
  const args = [2]
  const fn_ok = (objtr, r) => {console.log("remove.success: objtr",objtr,"resulset",r); console.log(r.rows)}
  executeobj({sql, args, fn_ok:fn_ok})
}

export const empty_base_user = obj => {
  const sql = `
  DELETE FROM base_user WHERE 1
  `
  const args = []
  const fn_ok = (objtr, r) => {console.log("remove.success: objtr",objtr,"resulset",r); console.log(r.rows)}
  executeobj({sql, args, fn_ok:fn_ok})  
}

export const updatefn = (user, fnok, fnnok=null) => {
  const sql = `
  UPDATE base_user 
  SET  name = ?,
  email = ?,
  phone = ?,
  password = ?,
  update_date = ?
  WHERE 1=1
  AND id = ?
  `
  const args = [user.name, user.email, user.phone, user.password, get_ymdhis(), user.id]
  console.log(sql, args)
  executeobj({sql, args, fn_ok:fnok, fn_nok: fnnok})
}

export const deletefn = (user, fnok, fnnok=null) => {
  const sql = `
  DELETE FROM base_user WHERE 1=1 AND id = ?
  `
  const args = [user.id]
  console.log(sql, args)
  executeobj({sql, args, fn_ok:fnok, fn_nok: fnnok})
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
  const fn_ok = (objtr, r) => {console.log("update.success: objtr",objtr,"resulset",r); console.log(r.rows)}
  executeobj({sql, args, fn_ok:fn_ok})
}
