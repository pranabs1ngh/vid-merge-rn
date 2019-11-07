import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

const footer = props => {
  return (
    <View style={styles.container}>
      <Button
        title="Merge Videos"
        type="outline"
      />
      <Button
        title="Merge Audio"
        type="outline"
      />
      <Button
        title="Delete"
        type="outline"
        onPress={props.delete}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default footer
