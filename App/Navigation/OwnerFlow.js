import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { OwnerTabNavigator } from './TabNavigation';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';
import { withModals } from './WithModalsHOC';
import withFluidLayout from '../HOC/withFluidLayout';
import { stackNavigatorConfig } from '../Config/NavigationConfig';

const routeConfigs = {
  schoolMain: {
    screen: OwnerTabNavigator
  },
  mySchoolsScreen: {
    screen: withFluidLayout(MySchoolsScreen)
  },
};

const navigationConfigs = {
  ...stackNavigatorConfig,
  mode: 'modal',
  headerMode: 'none',
  cardStyle: styles.card,
  initialRouteName: 'schoolMain',
};

const OwnerFlow = StackNavigator(routeConfigs, navigationConfigs);

export default withModals(OwnerFlow);
