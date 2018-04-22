import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { EmployeeTabNavigator } from './TabNavigation';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';
import { withModals } from './WithModalsHOC';
import withFluidLayout from '../HOC/withFluidLayout';

const routeConfigs = {
  schoolMain: {
    screen: EmployeeTabNavigator
  },
  mySchoolsScreen: {
    screen: withFluidLayout(MySchoolsScreen)
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
