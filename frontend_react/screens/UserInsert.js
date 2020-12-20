import React from 'react'
import { StyleSheet, Button, TextInput, ScrollView, View } from 'react-native'

const UserInsert = ()=>{
  return (
    <ScrollView style={styles.container} >
      <View style={styles.inputgroup} >
        <TextInput placeholder="Name" />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="email" />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="password" />
      </View>
      <View style={styles.inputgroup}>
        <Button title="Save User" />
      </View>      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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