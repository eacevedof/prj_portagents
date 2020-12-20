import React from 'react'
import { StyleSheet, Button, TextInput, ScrollView, View } from 'react-native'

const UserInsert = ()=>{
  return (
    <ScrollView>
      <View>
        <TextInput placeholder="Name" />
      </View>
      <View>
        <TextInput placeholder="email" />
      </View>
      <View>
        <TextInput placeholder="password" />
      </View>
      <View>
        <Button title="Save User" />
      </View>      
    </ScrollView>
  )
}

export default UserInsert