import React, {useEffect, useState} from 'react'
import { StyleSheet, Button, ScrollView } from 'react-native'
import {selectall} from "../modules/base_user/repository"
import {ListItem, Avatar} from "react-native-elements"


const UserList = (props)=>{

  const [users, set_users] = useState([])

  const obj = {
    fn: (tr, r)=>{
      const rows = Array.from(r.rows)
      console.table(rows)
      set_users(rows)
    }
  }

  useEffect(()=>{
    //selectall(obj)
    return ()=> set_users([])
  },[])

  //if(!users) return null

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
                <Avatar 
                  source={{uri: `https://randomuser.me/api/portraits/men/${user.id}.jpg`}}
                  rounded
                  />
                <ListItem.Content>
                  <ListItem.Title>{user.id} - {user.name}</ListItem.Title>
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