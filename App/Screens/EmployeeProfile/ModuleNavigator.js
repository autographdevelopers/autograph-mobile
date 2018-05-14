import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { stackNavigatorConfig } from '../../Config/NavigationConfig';
import Profile from './Profile';
import EditPrivileges from './Privileges/EditPrivileges';
import AvailabilityForm from './Availability/AvailabilityForm';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import EmployeeProfileHeader from '../../Components/EmployeeProfileHeader';
import AvailabilityIndex from './Availability/AvailabilityIndex';

const routeConfigs = {
  profile: {
    screen: Profile,
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
  ...stackNavigatorConfig,
  navigationOptions: ({ navigation }) => {
    return {
      header: <EmployeeProfileHeader navigation={navigation} />
    };
  },
  initialRouteName: 'profile',
  initialRouteParams: { title: 'Profile' },
  cardStyle: navStyles.card,
};

export default StackNavigator(routeConfigs, navigationConfigs);
