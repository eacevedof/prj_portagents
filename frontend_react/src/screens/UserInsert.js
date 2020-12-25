import React, {useState} from 'react'

import { StyleSheet, Button, TextInput, ScrollView, View, ToastAndroid, Alert} from 'react-native'

import IS from "../infrastructure/env"
import {create_table, insert, selectall, drop_table} from "../modules/base_user/repository"

const db_init = ()=>{
  drop_table()
  create_table()
  //insert()
  //remove()
  //update()
  //selectall()
}


const show_toast = ()=>{
  const msg = "registro guardado"
  if(IS.ANDROID) ToastAndroid.show(msg, ToastAndroid.SHORT)
  if(IS.IOS) Alert.alert(msg)
  if(IS.WEB) console.log(msg)
}

const UserInsert = (props)=>{

  const [state, set_state] = useState({
    name: '', email: '', phone: '', password: '1234'
  })

  const user_insert = () => {
    //db_init()
    //empty_user()
    //create_table()
    insert(state)
    //show_toast() 
    //selectall()
    props.navigation.navigate("UserList")
  }  

  const handleChangeText = (name, value) => {
    set_state({...state, [name]: value})
  }

  return (
    <ScrollView style={styles.container} >
      <View style={styles.inputgroup} >
        <TextInput placeholder="Name" onChangeText={v => handleChangeText('name', v)} />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="email" onChangeText={v => handleChangeText('email', v)} />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="phone" onChangeText={v => handleChangeText('phone', v)}/>
      </View>
      <View style={styles.inputgroup}>
        <Button title="Save User" onPress={e => user_insert()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },

  inputgroup: {
    flex: 1,
    padding:0,
    marginBottom:15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
})


export default UserInsert