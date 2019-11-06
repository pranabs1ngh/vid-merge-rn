import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screen/HomeScreen'

const navigator = createStackNavigator({
  Home: HomeScreen
}, {
  headerMode: 'none'
})

export default createAppContainer(navigator)