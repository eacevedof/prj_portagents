import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, TextInput, ScrollView, View} from 'react-native'
import {insert} from "../modules/base_user/repository"

const UserInsert = (props)=>{

  const [user, set_user] = useState({
    name: '', email: '', phone: '', password: '1234'
  })

  const user_insert = () => {
    insert({
      ...user,
      //esto ha solucionado el error cant perfom react state update ona unmounted component
      fn: ()=> props.navigation.navigate("UserList",{isnew:true})
    })
    
  }  

  const handleChangeText = (name, value) => {
    set_user({...user, [name]: value})
  }

  useEffect(()=>{
    console.log("insert loaded")
    return ()=> set_user({})
  },[])

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