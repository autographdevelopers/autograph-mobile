import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EmployeeProfile from './Profile';
import EditPrivileges from './Privileges/EditPrivileges';
import AvailabilityForm from './Availability/AvailabilityForm';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import EmployeeProfileHeader from '../../Components/EmployeeProfileHeader';
import AvailabilityIndex from './Availability/AvailabilityIndex';

const routeConfigs = {
  employeeProfile: {
    screen: EmployeeProfile,
  },
  editPrivileges: {
    screen: EditPrivileges,
  },
  availabilityIndex: {
    screen: AvailabilityIndex,
  },
  setAvailability: {
    screen: AvailabilityForm
  }
};

const navigationConfigs = {
  navigationOptions: ({ navigation }) => {
    return {
      header: <EmployeeProfileHeader navigation={navigation} />
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
