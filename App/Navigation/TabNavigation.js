import ActivitiesScreen from '../Screens/ActivitiesScreen';
import { TabNavigator } from 'react-navigation';
import { Colors } from '../Themes';

const routesConfigs = {
  activities: { screen: ActivitiesScreen }
};

const navigationConfig = {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: Colors.primaryWarm
  }
};

export default TabNavigator(routesConfigs, navigationConfig);
