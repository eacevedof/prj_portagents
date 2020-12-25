import React, {useEffect, useState} from 'react'
import { StyleSheet, Button, ScrollView } from 'react-native'
import {selectall} from "../modules/base_user/repository"
import {ListItem, Avatar} from "react-native-elements"


const UserList = (props)=>{

  const [users, set_users] = useState([])

  const obj = {
    fn: (tr, r)=>{
      const rows = Array.from(r.rows)
      //rows.forEach(o => console.log(o))
      set_users(rows)
      //console.log("UUUUUSSSS",rows[0],rows)
    }  
  }

  useEffect(()=>{
    selectall(obj)
    
    return ()=> console.log("userlist.index unmounting")
  },[])

  return (
    <ScrollView>
      <Button title="Insert" onPress={()=> props.navigation.navigate("UserInsert")} />
      {
        users.map(user => {
            <ListItem 
              key={user.id}
            >
              <ListItem.Chevron />
              <ListItem.Content>
                <ListItem.Title>user.name</ListItem.Title>
              </ListItem.Content>
            </ListItem>
        })
      }
    </ScrollView>
  )
}

export default UserList