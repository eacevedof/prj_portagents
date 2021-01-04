import React, {useEffect, useState} from 'react'
//import {useIsFocused} from "react-navigation/native"
import { StyleSheet, View, Button, ScrollView, ActivityIndicator } from 'react-native'
import {selectallfn,drop_table,create_table, get_ids} from "../modules/base_user/repository"
import {ListItem, Avatar} from "react-native-elements"
import {goto} from "../infrastructure/wrapper"
import IS from "../infrastructure/env"


const UserList = (props)=>{

  const [isloading, set_isloading] = useState(true)
  const [users, set_users] = useState([])

  const on_select = (tr, rs) => {
    console.log("list on select")
    let rows = []
    if(IS.WEB) rows = Array.from(rs.rows)
    else rows = rs.rows._array
    set_users(rows)
    set_isloading(false)
  }

  const item_onpress = userid => goto(props, "UserDetail", {userid})
  
  useEffect(()=>{
    console.log("userlist.loaded")
    
    //drop_table()
    const r = get_ids()
    create_table()
    selectallfn(on_select)

    return () => console.log("unmount")
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
      <View>
        <Button 
          title="Refresh" 
          onPress={()=> selectallfn(on_select)} 
        />
      </View>
      <View>
        <Button 
          title="Insert" 
          onPress={()=> goto(props, "UserInsert")} 
        />
      </View>
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
                  <ListItem.Title>{user.id} - {user.uuid}</ListItem.Title>
                  <ListItem.Subtitle>{user.name}</ListItem.Subtitle>
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