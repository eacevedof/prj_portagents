import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const stacknav = createStackNavigator()

function my_stack(){
  //stack screen es cada pantalla
  return (
    <Stack.Navigator>

      <Stack.Screen />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>

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
