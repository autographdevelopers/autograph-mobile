import InformationStep from './Information';
import { StackNavigator } from 'react-navigation';
import NotificationsStep from './Notifications';
import CalendarStep from './Calendar';
import navStyles from '../../Navigation/Styles/NavigationStyles';

const routeConfigs = {
  step1: { screen: InformationStep },
  step2: { screen: NotificationsStep },
  step3: { screen: CalendarStep }
};

const navigationConfigs = {
  initialRouteName: 'step1',
  cardStyle: navStyles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
