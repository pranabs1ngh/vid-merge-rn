import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}>
        <Ionicons name='ios-camera' style={styles.buttonTxt} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonTxt: {
    fontSize: 50,
    textAlign: 'right',
    paddingRight: 10,
  }
})

export default HomeScreen
