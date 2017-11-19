import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Screens/Login/login'
import ResetPasswordScreen from '../Screens/reset_password';
import TabNavigation from './TabNavigation';
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const routeConfigs = {
  login: { screen: LoginScreen },
  resetPassword: { screen: ResetPasswordScreen},
  main: { screen: TabNavigation}
}

const navigationConfigs = {
  headerMode: 'none',
  initialRouteName: 'login',
  cardStyle: styles.card
}

export default StackNavigator(routeConfigs, navigationConfigs);
