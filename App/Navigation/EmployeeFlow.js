import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { EmployeeTabNavigator } from './TabNavigation';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';
import { withModals } from './WithModalsHOC';

const routeConfigs = {
  schoolMain: {
    screen: EmployeeTabNavigator
  },
  mySchoolsScreen: {
    screen: MySchoolsScreen
  },
};

const navigationConfigs = {
  mode: 'modal',
  headerMode: 'none',
  cardStyle: styles.card,
  initialRouteName: 'schoolMain'
};

const EmployeeFlow = StackNavigator(routeConfigs, navigationConfigs);

export default withModals(EmployeeFlow);
