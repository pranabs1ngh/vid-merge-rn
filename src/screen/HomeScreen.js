import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, FlatList } from 'react-native'
import RNFS from 'react-native-fs'
import { RNFFmpeg } from 'react-native-ffmpeg'
import Entypo from 'react-native-vector-icons/Entypo'
import { ListItem, CheckBox } from 'react-native-elements'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dir: [],
      selected: [],
      isProcessing: false
    }
    this.loadFiles()
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.loadFiles())
  }

  loadFiles = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(result => {
        result = result.map(item => ({ ...item, isSelected: false }))
        this.setState({ dir: result, selected: [], isProcessing: false })
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
          else if (item.path.endsWith('k.mp4'))
            RNFS.unlink(item.path)
        })
        this.loadFiles()
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .catch(console.log)
  }

  mergeVideos = async () => {
    const today = new Date();
    this.setState({ isProcessing: true })
    if (this.state.selected[0].endsWith('.mp4') && this.state.selected[1].endsWith('mp4')) {
      try {
        RNFFmpeg.resetStatistics();

        // 1. EXTRACT ALL FRAMES FROM 1ST VIDEO & FIRST 5 FRAMES FROM 2ND VIDEO
        await RNFFmpeg.execute(`-i ${this.state.selected[0]} ${RNFS.DocumentDirectoryPath}/out%05d.jpeg`)
        await RNFFmpeg.execute(`-i ${this.state.selected[1]} -vframes 5 ${RNFS.DocumentDirectoryPath}/in%05d.jpeg`)

        // 2. ENCODE A VIDEO FROM THOSE FRAMES
        await RNFFmpeg.execute(`-i ${RNFS.DocumentDirectoryPath}/out%05d.jpeg -i ${RNFS.DocumentDirectoryPath}/in%05d.jpeg -filter_complex [0][1]concat=n=2:v=1:a=0 ${RNFS.DocumentDirectoryPath}/OUTPUT${today.getTime()}.mp4`)

        // 4. DELETE ALL EXTRA FILES CREATED IN THE PROCESS
        this.deleteCacheFiles()
      } catch (err) { console.log(err) }
    }
  }

  mergeAudio = async () => {
    const today = new Date();
    this.setState({ isProcessing: true })
    if (this.state.selected[0].endsWith('.mp4') && this.state.selected[1].endsWith('mp4')) {
      try {
        RNFFmpeg.resetStatistics();

        // 1. ENCODE A VIDEO FROM 1ST SELECTED FILE AND AUDIO FROM 2ND SELECTED FILE
        await RNFFmpeg
          .execute(`-i ${this.state.selected[0]} -i ${this.state.selected[1]} -map 0:v:0 -map 1:a:0 -shortest ${RNFS.DocumentDirectoryPath}/OUTPUT${today.getTime()}.mp4`)

        // 2. DELETE ALL EXTRA FILES CREATED IN THE PROCESS
        this.deleteCacheFiles()
      } catch (err) { console.log(err) }
    }
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
        <FlatList
          data={this.state.dir}
          keyExtractor={item => item.name}
          style={styles.container}
          renderItem={({ item, index }) => {
            if (!item.name.endsWith('.js')) return <TouchableHighlight onPress={() => {
              if (item.name.endsWith('.mp4'))
                this.props.navigation.navigate('Video', { path: item.path })
            }}>
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
          }}
        />
        <Footer
          mergeVideos={this.mergeVideos}
          mergeAudio={this.mergeAudio}
          delete={this.deleteFiles}
        />
        <Loader isVisible={this.state.isProcessing} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})