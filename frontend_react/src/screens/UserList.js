import React, {useEffect, useState} from 'react'
//import {useIsFocused} from "react-navigation/native"
import { StyleSheet, Button, ScrollView } from 'react-native'
import {selectall} from "../modules/base_user/repository"
import {ListItem, Avatar} from "react-native-elements"


const UserList = (props)=>{

  //const isFocused = useIsFocused()
  const [users, set_users] = useState([])

  const obj = {
    fn: (tr, r)=>{
      const rows = Array.from(r.rows)
      console.table(rows)
      set_users(rows)
    }
  }

  const is_focused = props.navigation.addListener("didFocus",()=>{
    alert("fucus")
    selectall(obj)
  })

  const item_onpress = (userid) => {
    props.navigation.navigate("UserDetail",{user_id:userid})
  }

  useEffect(()=>{
    console.log("userlist.loaded")
    selectall(obj)
    return () => is_focused
  },[props])

  return (
    <ScrollView>
      <Button 
        title="Insert" 
        onPress={()=> props.navigation.navigate("UserInsert")} 
      />
      {
        users.map(user => {
            return (
              <ListItem key={user.id} bottomDivider onPress={() => item_onpress(user.id)}>
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