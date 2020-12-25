import React, {useEffect, useState} from 'react'
import { StyleSheet, Button, ScrollView } from 'react-native'
import {selectall} from "../modules/base_user/repository"
import {ListItem, Avatar} from "react-native-elements"


const UserList = (props)=>{

  const [users, set_users] = useState([{id:-1,name:"uuu 1"},{id:-2,name:"uuu 2"},])

  const obj = {
    fn: (tr, r)=>{
      const rows = Array.from(r.rows)
      console.table(rows)
      set_users(rows)
    }
  }

  useEffect(()=>{
    selectall(obj)
    return ()=> console.log("userlist.index unmounting")
  },[])

  return (
    <ScrollView>
      <Button 
        title="Insert" 
        onPress={()=> props.navigation.navigate("UserInsert")} 
      />
      {
        users.map(user => {
            return (
              <ListItem key={user.id}>
                <ListItem.Chevron />
                <Avatar source={{uri: `https://randomuser.me/api/portraits/men/${user.id}.jpg`}}/>
                <ListItem.Content>
                  <ListItem.Title>{user.name}</ListItem.Title>
                  <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
        })
      }
    </ScrollView>
  )
}

export default UserList