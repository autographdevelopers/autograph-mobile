import {StackNavigator} from 'react-navigation'
import LoginScreen from '../Screens/Login/login'
import LaunchScreen from '../Screens/launch_screen';
import ResetPasswordScreen from '../Screens/reset_password';
import TabNavigation from './TabNavigation';
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const routeConfigs = {
  login: {screen: LoginScreen},
  launchScreen: {screen: LaunchScreen},
  resetPassword: {screen: ResetPasswordScreen},
  main: {screen: TabNavigation}
}

const navigationConfigs = {
  headerMode: 'none',
  initialRouteName: 'launchScreen',
  cardStyle: styles.card
}

export default StackNavigator(routeConfigs, navigationConfigs);
