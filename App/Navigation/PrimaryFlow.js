import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StudentTabNavigator, EmployeeTabNavigator, OwnerTabNavigator } from './TabNavigation';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import styles from './Styles/NavigationStyles';

const routeConfigs = {
  employeeMain: {
    screen: EmployeeTabNavigator
  },
  ownerMain: {
    screen: OwnerTabNavigator
  },
  studentMain: {
    screen: StudentTabNavigator
  },
  mySchoolsScreen: {
    screen: MySchoolsScreen
  },
};

const navigationConfigs = {
  mode: 'modal',
  headerMode: 'none',
  cardStyle: styles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
