import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

export default props => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Files</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}>
        <Ionicons name='ios-camera' size={40} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '8%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#2089dc',
    justifyContent: 'space-between'
  },
  heading: {
    marginTop: 4,
    color: '#fff',
    fontSize: 25
  }
})