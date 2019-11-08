import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'

const Loader = props => <>
  <Overlay
    isVisible={props.isVisible}
    windowBackgroundColor="rgba(0, 0, 0, .5)"
    overlayBackgroundColor="rgb(255, 255, 255)"
    width="auto"
    height="auto"
    borderRadius={10}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <ActivityIndicator size="large" color="#2089dc" />
      <Text style={{ fontSize: 18, paddingHorizontal: 10, paddingVertical: 5 }}>
        Processing Videos
      </Text>
    </View>
  </Overlay>
</>

export default Loader
