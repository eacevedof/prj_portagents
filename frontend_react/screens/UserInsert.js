import React, {useState} from 'react'
import { StyleSheet, Button, TextInput, ScrollView, View } from 'react-native'

const UserInsert = ()=>{

  const [state, set_state] = useState({
    name: '', email: '', phone: ''
  })


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
        <Button title="Save User" onPress={()=>console.log(state)} />
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