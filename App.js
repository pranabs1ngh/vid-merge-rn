import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screen/HomeScreen'
import CameraScreen from './src/screen/CameraScreen'

const navigator = createStackNavigator({
  Home: HomeScreen,
  Camera: CameraScreen
}, {
  headerMode: 'none'
})

export default createAppContainer(navigator)