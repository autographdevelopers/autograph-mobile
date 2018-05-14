import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StudentTabNavigator } from './TabNavigation';
import { stackNavigatorConfig } from '../Config/NavigationConfig';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';
import { withModals } from './WithModalsHOC';
import withFluidLayout from '../HOC/withFluidLayout';

const routeConfigs = {
  schoolMain: {
    screen: StudentTabNavigator
  },
  mySchoolsScreen: {
    screen: withFluidLayout(MySchoolsScreen)
  }
};

const navigationConfigs = {
  ...stackNavigatorConfig,
  mode: 'modal',
  headerMode: 'none',
  cardStyle: styles.card,
  initialRouteName: 'schoolMain'
};

const StudentFlow = StackNavigator(routeConfigs, navigationConfigs);

export default withModals(StudentFlow);
