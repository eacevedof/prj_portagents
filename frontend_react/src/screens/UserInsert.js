import React, {useState, useEffect, useRef} from "react"
import { StyleSheet, Button, TextInput, ScrollView, View} from "react-native"
import {insertfn} from "../modules/base_user/repository"

const UserInsert = (props)=>{

  const txtname = useRef(null)
  const [issaved, set_issaved] = useState(false)
  
  const [user, set_user] = useState({})

  const user_insert = () => insertfn(user, ()=>set_issaved(true), (e)=>console.log("insert error",e))
  //const user_insert = () => insertfn(user, ()=> props.navigation.navigate("UserList",{isnew:true}))
  
  const input_onchange = (name, value) => {
    set_user({...user, [name]: value})
  }

  useEffect(()=>{
    console.log("insert loaded",issaved)
    //esto es lo que provoca el error, el ir al componente que no está descargado
    if(issaved) props.navigation.navigate("UserList",{isnew:true})
    txtname.current.focus()
    return () => set_user({})
  },[issaved])

  return (
    <ScrollView style={styles.container} >
      <View style={styles.inputgroup} >
        <TextInput placeholder="Name" 
          ref={txtname}
          onChangeText={v => input_onchange("name", v)} />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="email" 
          onChangeText={v => input_onchange("email", v)} />
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="phone" 

          onChangeText={v => input_onchange("phone", v)}/>
      </View>
      <View style={styles.inputgroup}>
        <TextInput placeholder="password" 

          onChangeText={v => input_onchange("password", v)}/>
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
    borderBottomColor: "#ccc"
  },
})


export default UserInsert