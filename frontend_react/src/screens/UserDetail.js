import React, {useEffect, useState} from 'react'
import { StyleSheet, Button, TextInput, ScrollView, View, ActivityIndicator} from 'react-native'
import {selectdetail, updatefn, deletefn} from "../modules/base_user/repository"

const UserDetail = (props)=>{
  
  const [isloading, set_isloading] = useState(true)
  const [user, set_user] = useState({})
  const userid = props.route.params.userid

  const on_select = (tr, rs) => {
    const rows = Array.from(rs.rows)
    console.table(rows)
    set_user({...rows[0]})
    set_isloading(false)
  }

  const update_user = () => {
    updatefn(user, ()=> alert("updated"))
  }

  const delete_user = () => {
    deletefn(user, ()=> props.navigation.navigate("UserList",{isdeleted:true}))
  }

  useEffect(()=>{
    set_isloading(true)
    console.log("userdetail.loaded")
    selectdetail(userid, on_select)
    return () => set_user([])
  },[props])


  const handleChangeText = (name, value) => {
    set_user({...user, [name]: value})
  }

  if(isloading){
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} >
      <View style={styles.inputgroup} >
        <TextInput placeholder="name" 
          value={user.name}
          onChangeText={v => handleChangeText('name', v)} />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="email" 
          value={user.email}
          onChangeText={v => handleChangeText('email', v)}  />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="phone" 
          value={user.phone}
          onChangeText={v => handleChangeText('phone', v)} />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="password" 
          value={user.password}
          onChangeText={v => handleChangeText('password', v)} />
      </View>
      <View style={styles.inputgroup}>
        <Button 
          color="#19AC52"
          title="Update User" onPress={e => update_user()} />
      </View>
      <View style={styles.inputgroup}>
        <Button 
          color="#E37399"
          title="Delete User" onPress={e => delete_user()} 
          />
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

export default UserDetail