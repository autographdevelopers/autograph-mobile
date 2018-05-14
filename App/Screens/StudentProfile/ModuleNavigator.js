import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { stackNavigatorConfig } from '../../Config/NavigationConfig';
import Profile from './Profile';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import StudentProfileHeader from '../../Components/StudentProfileHeader';
import ManageStudent from './Settings/ManageStudent';

const routeConfigs = {
  profile: {
    screen: Profile,
  },
  manageStudent: {
    screen: ManageStudent
  }
};

const navigationConfigs = {
  ...stackNavigatorConfig,
  navigationOptions: ({ navigation }) => {
    return {
      header: <StudentProfileHeader navigation={navigation} />
    };
  },
  initialRouteName: 'profile',
  initialRouteParams: { title: 'Profile' },
  cardStyle: navStyles.card,
};

export default StackNavigator(routeConfigs, navigationConfigs);
