import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

const footer = props => {
  return (
    <View style={styles.container}>
      <Button
        title="Merge Videos"
        type="outline"
        onPress={props.mergeVideos}
      />
      <Button
        title="Merge Audio"
        type="outline"
        onPress={props.mergeAudio}
      />
      <Button
        title="Delete File(s)"
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
