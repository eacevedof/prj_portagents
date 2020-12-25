import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {selectall} from "../modules/base_user/repository"


const UserList = ()=>{

  const [users, set_users] = useState([])

  const obj = {
    fn: (tr, r)=>{
      set_users(r.rows)
    }  
  }

  useEffect(()=>{
    selectall(obj)
    return ()=> console.log("userlist.index unmounting",users)
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