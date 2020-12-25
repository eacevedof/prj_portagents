import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {selectall} from "../modules/base_user/repository"


const UserList = ()=>{

  const [users, set_users] = useState([])

  const obj = {
    fnsuccess: (tr, r)=>{
      set_users(r.rows)
    }  
  }

  useEffect(()=>{
    console.log("useeff",obj)
    selectall(obj)
    return ()=> console.log("product.index unmounting")
  },[])

  return (
    <div>
        <View>
          <Text>User List</Text>
        </View>
    </div>
  )
}

export default UserList