import React, {useEffect, useState} from 'react'
//import {useIsFocused} from "react-navigation/native"
import { StyleSheet, View, Button, ScrollView, ActivityIndicator } from 'react-native'
import {selectallfn,drop_table,create_table} from "../modules/base_user/repository"
import {ListItem, Avatar} from "react-native-elements"


const UserList = (props)=>{

  const [isloading, set_isloading] = useState(true)
  const [users, set_users] = useState([])

  const on_select = (tr, rs) => {
    console.log("list on select")
    const rows = Array.from(rs.rows)
    set_users(rows)
    set_isloading(false)
  }

  const item_onpress = (userid) => props.navigation.navigate("UserDetail",{userid})
  
  useEffect(()=>{
    console.log("userlist.loaded")
    let ismounted = true;

    create_table()
    
    if(ismounted) selectallfn(on_select)
    console.log("userlist.end loaded")
    return () => ismounted=false
  },[props])

  if(isloading){
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    )
  }

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