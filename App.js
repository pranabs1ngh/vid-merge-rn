import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screen/HomeScreen'
import CameraScreen from './src/screen/CameraScreen'
import VideoScreen from './src/screen/VideoScreen'

const navigator = createStackNavigator({
  Home: HomeScreen,
  Camera: CameraScreen,
  Video: VideoScreen
}, {
  headerMode: 'none'
})

export default createAppContainer(navigator)