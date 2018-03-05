import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EmployeeProfile from './Profile';
import EmployeeManagement from './ManageEmployee';
import SetAvailability from './SetAvailability';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import ProfileHeader from '../../Components/ProfileHeader';
import AvailabilityDashboard from './AvailabilityDashboard';

const routeConfigs = {
  employeeProfile: {
    screen: EmployeeProfile,
  },
  manageEmployee: {
    screen: EmployeeManagement,
  },
  availabilityDashboard: {
    screen: AvailabilityDashboard,
  },
  setAvailability: {
    screen: SetAvailability
  }
};

const navigationConfigs = {
  navigationOptions: (props) => {
    const { navigation } = props;
    const { user, index, title } = navigation.state.params;

    return {
      header:
        <View>
          <NavHeader navigation={navigation} title={title}/>
          <ProfileHeader
            onManagePersonClick={() => navigation.navigate(
              'manageEmployee', { user, index, title: 'Ustaw uprawnienia' })}
            onSetAvailabilityClick={() => navigation.navigate('availabilityDashboard', { user, index, title: 'Dyspozycyjnosc' })}
            avatarProps={{ name: user.name, index }}
            user={user}
            routeName={navigation.state.routeName}
          />
        </View>
    };
  },
  initialRouteName: 'employeeProfile',
  initialRouteParams: { title: 'Profile' },
  cardStyle: navStyles.card,
};

const ProfileNavigation = StackNavigator(routeConfigs, navigationConfigs);

export default class EmployeeProfileModule extends Component {
  static navigationOptions = { header: null };

  componentWillUnmount = () => {
    this.props.screenProps.setCurrentEmployee(null);
  };

  render() {
    const { user, index } = this.props.navigation.state.params;
    const { navigation, screenProps } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ProfileNavigation
          navigation={navigation}
          screenProps={{ user, index, ...screenProps }} />
      </View>
    );
  }
}

EmployeeProfileModule.router = ProfileNavigation.router;
