import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Video from 'react-native-video'

export default props => <>
  <Video source={{ uri: props.navigation.state.params.path }}
    fullscreen
    fullscreenOrientation='all'
    onError={() => console.log('Error: Can\'t play video')}
    onEnd={() => props.navigation.goBack()}
    style={styles.videoPlayer}
  />
</>

var styles = StyleSheet.create({
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000'
  },
});