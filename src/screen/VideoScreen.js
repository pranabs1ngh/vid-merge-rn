import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Video from 'react-native-video'

export default class VideoScreen extends Component {
  render() {
    return (
      <>
        <Video source={{ uri: this.props.navigation.state.params.path }}
          ref={(ref) => {
            this.player = ref
          }}
          fullscreen
          fullscreenOrientation='all'
          onError={() => console.log('Error: Can\'t play video')}
          onEnd={() => this.props.navigation.goBack()}
          style={styles.videoPlayer}
        />
      </>
    )
  }
}

var styles = StyleSheet.create({
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});