import { StatusBar } from 'expo-status-bar'
import {Buffer} from "buffer"
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import UserList from "./src/screens/UserList"
import UserInsert from "./src/screens/UserInsert"
import UserDetail from "./src/screens/UserDetail"

global.Buffer = Buffer

//componente
const Stack = createStackNavigator()


function Screens(){
  
  //stack screen es cada pantalla
  //el orden de importa ya que son como capas de navegacion
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{title: "Users"}}/>
      <Stack.Screen name="UserInsert" component={UserInsert} options={{title: "User Create"}} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{title: "User Detail"}}/>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
