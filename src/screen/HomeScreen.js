import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import RNFS from 'react-native-fs'
import Entypo from 'react-native-vector-icons/Entypo'
import Header from '../components/header'
import { ListItem } from 'react-native-elements'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.loadFiles()
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.loadFiles())
  }

  loadFiles = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        this.setState({ dir: result })
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        {this.state.dir && this.state.dir.map((item, index) => {
          if (item.name.endsWith('.mp4')) return <TouchableHighlight
            key={index}
            onPress={() => {
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
              bottomDivider
            />
          </TouchableHighlight>
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
