import ActivitiesScreen from '../Screens/activities';
import { TabNavigator } from 'react-navigation';

const routesConfigs = {
  activities: {screen: ActivitiesScreen}
}

const navigationConfig = {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
}

export default TabNavigator(routesConfigs, navigationConfig);
