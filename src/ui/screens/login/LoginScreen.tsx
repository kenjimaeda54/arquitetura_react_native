import { Pressable, StyleSheet, Text, View } from "react-native"
import { useLoginStore } from "../../../data/store/useLoginStore";



export default function LoginScreen() {


  async function login() {
    try {
      useLoginStore.setState({ isLogged: true })
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <View style={style.container}>
      <Pressable onPress={login}>
        <Text style={style.text}>Fazer login</Text>
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 13,
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 20
  }
})