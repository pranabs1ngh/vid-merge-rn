import React from 'react'
import { StyleSheet, View } from 'react-native'
import RNFS from 'react-native-fs'
import Header from '../components/header'

const HomeScreen = props => {
  RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .catch((err) => {
      console.log(err.message);
    });

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default HomeScreen
