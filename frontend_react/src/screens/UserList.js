import React, {useEffect, useState} from 'react'
import { StyleSheet, Button, ScrollView } from 'react-native'
import {selectall} from "../modules/base_user/repository"


const UserList = (props)=>{

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
    <ScrollView>
      <Button title="Insert" onPress={()=> props.navigation.navigate("UserInsert")} />
      {
        users.map(user => {
          
        })
      }
    </ScrollView>
  )
}

export default UserList