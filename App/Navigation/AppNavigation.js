import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../Screens/LoginScreen';
import LaunchScreen from '../Screens/LaunchScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import NewDrivingSchoolWizardForm from '../Screens/NewDrivingSchool/index';
import InviteEmployeeWizardForm from '../Screens/Employees/Invite/InviteEmployeeWizardFormNavigatorScreen';
import InviteStudentForm from '../Screens/Students/InviteForm';
import StartScreen from '../Screens/StartScreen';
import TabNavigation from './TabNavigation';
import styles from './Styles/NavigationStyles';
import NavHeader from '../Components/NavHeader';
import DrivingSchoolInfo from '../Screens/NewDrivingSchool/Information';
import ScheduleBoundaries from '../Screens/NewDrivingSchool/ScheduleBoundaries';
import ScheduleSettings from '../Screens/NewDrivingSchool/ScheduleSettings';
import EmployeeProfileModule from '../Screens/EmployeeProfile/ModuleNavigator';
import ManageEmployee from '../Screens/EmployeeProfile/ManageEmployee';

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
  inviteStudent: { screen: InviteStudentForm },
  editSchoolInfo: {
    screen: DrivingSchoolInfo,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Informacje'}/>
    }
  },
  editScheduleBoundaries: {
    screen: ScheduleBoundaries,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Godziny jazd'}/>
    }
  },
  editScheduleSettings: {
    screen: ScheduleSettings,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Ustawienia kalendarza'}/>
    }
  },
  userProfile: {
    screen: EmployeeProfileModule,
  }
};

const navigationConfigs = {
  headerMode: 'float',
  initialRouteName: 'launchScreen',
  cardStyle: styles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
