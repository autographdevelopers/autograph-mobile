import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { OwnerTabNavigator } from './TabNavigation';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';
import NewDrivingSchoolWizardForm from '../Screens/NewDrivingSchool';

const routeConfigs = {
  schoolMain: {
    screen: OwnerTabNavigator
  },
  mySchoolsScreen: {
    screen: MySchoolsScreen
  },
  newDrivingSchool: {
    screen: NewDrivingSchoolWizardForm
  }
};

const navigationConfigs = {
  mode: 'modal',
  headerMode: 'none',
  cardStyle: styles.card,
  initialRouteName: 'schoolMain'
};

export default StackNavigator(routeConfigs, navigationConfigs);
