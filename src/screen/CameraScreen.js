import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import RNFS from 'react-native-fs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

export default class CameraScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cameraType: 'back',
      recording: false
    }
  }

  changeCameraType = () => {
    this.setState(state => ({
      cameraType: state.cameraType === 'back' ? 'front' : 'back'
    }))
  }

  startRecording = async () => {
    if (this.camera) {
      this.setState({ recording: true });
      const today = new Date();
      const fileName = 'VID' + today.getTime() + '.mp4'
      const { uri, codec = "mp4" } = await this.camera.recordAsync();
      RNFS.copyFile(uri, RNFS.DocumentDirectoryPath + '/' + fileName).then(() => {
        console.log('File copied locally.')
      }), err => {
        console.log(err)
      }
    }
  }

  stopRecording = () => {
    this.setState({ recording: false });
    this.camera.stopRecording();
  }

  render = () => {
    let button = (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.startRecording}
        style={styles.capture}
      ></TouchableOpacity>
    )

    if (this.state.recording) button = (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.stopRecording}
        style={styles.stopRecording}
      >
        <View style={styles.stopIco}></View>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.goBack()}
            style={styles.typeBtn}
          >
            <Entypo name='folder-video' size={30} style={{ textAlign: 'center' }} />
          </TouchableOpacity>
          {button}
          <TouchableOpacity activeOpacity={0.8} onPress={this.changeCameraType} style={styles.typeBtn}>
            <Ionicons name='md-refresh' size={30} style={{ textAlign: 'center' }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  footer: {
    flex: 0,
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    height: 90,
    width: 90,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 45,
    backgroundColor: '#FF5722'
  },
  typeBtn: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  stopRecording: {
    flex: 0,
    height: 90,
    width: 90,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 45,
    justifyContent: 'center',
    alignContent: 'center'
  },
  stopIco: {
    height: 35,
    width: 35,
    borderRadius: 10,
    backgroundColor: '#FF5722',
    alignSelf: 'center'
  }
});