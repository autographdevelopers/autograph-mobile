import { StackNavigator } from 'react-navigation';
import LoginScreen from '../Screens/LoginScreen';
import LaunchScreen from '../Screens/LaunchScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import TabNavigation from './TabNavigation';
import styles from './Styles/NavigationStyles';
import React, { Component } from 'react';

// Manifest of possible screens
const routeConfigs = {
  login: { screen: LoginScreen },
  signUp: { screen: SignUpScreen },
  launchScreen: { screen: LaunchScreen },
  resetPassword: { screen: ResetPasswordScreen },
  main: { screen: TabNavigation }
};

const navigationConfigs = {
  headerMode: 'float',
  initialRouteName: 'launchScreen',
  cardStyle: styles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
