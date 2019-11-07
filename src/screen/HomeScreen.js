import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import RNFS from 'react-native-fs'
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg'
import Entypo from 'react-native-vector-icons/Entypo'
import { ListItem, CheckBox } from 'react-native-elements'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dir: [],
      selected: []
    }
    this.loadFiles()
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.loadFiles())
  }

  loadFiles = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(result => {
        result = result.map(item => ({ ...item, isSelected: false }))
        this.setState({ dir: result, selected: [] })
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .catch(console.log)
  }

  deleteCacheFiles = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(result => {
        result.forEach(item => {
          if (item.path.endsWith('.jpeg'))
            RNFS.unlink(item.path)
        })
        this.loadFiles()
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .catch(console.log)
  }

  mergeVideos = async () => {
    const today = new Date();
    if (this.state.selected[0].endsWith('.mp4') && this.state.selected[1].endsWith('mp4')) {
      try {
        RNFFmpeg.resetStatistics();

        // 1. EXTRACT ALL FRAMES FROM 1ST VIDEO & FIRST 5 FRAMES FROM 2ND VIDEO
        await RNFFmpeg.execute(`-i ${this.state.selected[0]} ${RNFS.DocumentDirectoryPath}/out%05d.jpeg`)
        await RNFFmpeg.execute(`-i ${this.state.selected[1]} -vframes 5 ${RNFS.DocumentDirectoryPath}/out%05d.jpeg`)

        // 2. ENCODE A VIDEO FROM THOSE FRAMES
        await RNFFmpeg
          .execute(`-i ${RNFS.DocumentDirectoryPath}/out%05d.jpeg -c:v mpeg4 -r 24 ${RNFS.DocumentDirectoryPath}/OUTPUT${today.getTime()}.mp4`)

        // 4. DELETE ALL EXTRA FILES CREATED IN THE PROCESS
        this.deleteCacheFiles()
      } catch (err) { console.log(err) }
    }
  }

  mergeAudio = () => {
    console.log('Merge Audio')
  }

  deleteFiles = () => {
    this.state.selected.forEach(item => {
      RNFS.unlink(item)
        .then(this.loadFiles)
        .catch(console.log)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          {this.state.dir.map((item, index) => {
            if (item.name.endsWith('.mp4') || item.name.endsWith('.jpeg'))
              return <TouchableHighlight
                key={index}
                onPress={() => {
                  item.name.endsWith('.mp4') &&
                    this.props.navigation.navigate('Video', { path: item.path })
                }}
              >
                <ListItem
                  leftIcon={<Entypo
                    name='video'
                    size={30}
                    style={{ textAlign: 'center' }}
                  />}
                  title={item.name}
                  subtitle={String((item.size / 1024 / 1024).toFixed(2)) + ' MB'}
                  rightElement={<CheckBox
                    checked={item.isSelected}
                    onPress={() => this.setState(({ dir, selected }) => {
                      if (item.isSelected) {
                        const i = selected.findIndex(path => path === item.path)
                        selected.splice(i, 1)
                        dir[index].isSelected = false
                        return { dir, selected }
                      }
                      else {
                        selected.push(item.path)
                        dir[index] = { ...item, isSelected: true }
                        return { dir, selected }
                      }
                    })}
                  />}
                  bottomDivider
                />
              </TouchableHighlight>
          })}
        </View>
        <Footer
          mergeVideos={this.mergeVideos}
          mergeAudio={this.mergeAudio}
          delete={this.deleteFiles}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})