import React, {useEffect, useState} from 'react'
import { StyleSheet, Button, TextInput, ScrollView, View} from 'react-native'
import {selectdetail, updatefn} from "../modules/base_user/repository"

const UserDetail = (props)=>{
  
  const [user, set_user] = useState({})

  const on_select = (tr, rs) => {
    const rows = Array.from(rs.rows)
    console.table(rows)
    set_user({...rows[0]})
  }

  const update_user = () => {
    updatefn(user, ()=> alert("updated"))
  }

  useEffect(()=>{
    console.log("userdetail.loaded")
    userid = props.route.params.userid
    selectdetail(userid, on_select)
    return () => set_user([])
  },[props])

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
        <Button title="Save User" onPress={e => update_user()} />
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