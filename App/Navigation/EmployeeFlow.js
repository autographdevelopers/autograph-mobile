import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { EmployeeTabNavigator } from './TabNavigation';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';
import NewDrivingSchoolWizardForm from '../Screens/NewDrivingSchool/index';


const routeConfigs = {
  schoolMain: {
    screen: EmployeeTabNavigator
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
