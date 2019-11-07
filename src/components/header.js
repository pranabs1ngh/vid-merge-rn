import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { Header } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

const header = props => {
  return (
    <>
      <Header
        leftComponent={{ text: 'Files', style: { color: '#fff', fontSize: 25 } }}
        rightComponent={
          <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}>
            <Ionicons name='ios-camera' size={40} color='#fff' />
          </TouchableOpacity>
        }
      />
    </>
  )
}

export default header
