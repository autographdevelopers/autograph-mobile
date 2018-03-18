import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { EmployeeTabNavigator } from './TabNavigation';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';

const routeConfigs = {
  schoolMain: {
    screen: EmployeeTabNavigator
  },
  mySchoolsScreen: {
    screen: MySchoolsScreen
  }
};

const navigationConfigs = {
  mode: 'modal',
  headerMode: 'none',
  cardStyle: styles.card,
  initialRouteName: 'schoolMain'
};

export default StackNavigator(routeConfigs, navigationConfigs);
