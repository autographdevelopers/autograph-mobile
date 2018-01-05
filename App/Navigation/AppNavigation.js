import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../Screens/LoginScreen';
import LaunchScreen from '../Screens/LaunchScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import NewDrivingSchoolWizardForm from '../Screens/NewDrivingSchool/index';
import InviteEmployeeWizardForm from '../Screens/InviteEmployee/index';
import InviteStudentForm from '../Screens/Students/InviteForm';
import StartScreen from '../Screens/StartScreen';
import TabNavigation from './TabNavigation';
import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const routeConfigs = {
  login: { screen: LoginScreen },
  signUp: { screen: SignUpScreen },
  launchScreen: { screen: LaunchScreen },
  resetPassword: { screen: ResetPasswordScreen },
  startScreen: { screen: StartScreen },
  main: {
    screen: TabNavigation, navigationOptions: {
      header: null
    }
  },
  newDrivingSchool: { screen: NewDrivingSchoolWizardForm },
  inviteEmployee: { screen: InviteEmployeeWizardForm },
  inviteStudent: { screen: InviteStudentForm }
};

const navigationConfigs = {
  headerMode: 'float',
  initialRouteName: 'launchScreen',
  cardStyle: styles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
