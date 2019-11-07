import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import RNFS from 'react-native-fs'

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
      .then((result) => {
        this.setState({ dir: result })
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .catch(console.log);
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
            if (item.name.endsWith('.mp4')) return <TouchableHighlight
              key={index}
              onPress={() => {
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
                  checked={item.selected}
                  onPress={() => this.setState(({ dir, selected }) => {
                    if (dir[index].selected) {
                      const index = selected.findIndex(path => path === item.path)
                      selected.splice(index, 1)
                      dir[index] = { ...dir[index], selected: false }
                    }
                    else {
                      selected.push(item.path)
                      dir[index] = { ...dir[index], selected: true }
                    }
                    return { dir, selected }
                  })}
                />}
                bottomDivider
              />
            </TouchableHighlight>
          })}
        </View>
        <Footer delete={this.deleteFiles} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})