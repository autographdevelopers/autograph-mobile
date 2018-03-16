import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../Screens/LaunchLoginPair/LoginScreen';
import LaunchScreen from '../Screens/LaunchLoginPair/LaunchScreen';
import LaunchLoginPair from '../Screens/LaunchLoginPair/ModuleNavigator';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import NewDrivingSchoolWizardForm from '../Screens/NewDrivingSchool/index';
import InviteEmployeeWizardForm from '../Screens/Employees/Invite/InviteEmployeeWizardFormNavigatorScreen';
import InviteStudentForm from '../Screens/Students/InviteForm';
import { StudentTabNavigator, EmployeeTabNavigator, OwnerTabNavigator } from './TabNavigation';
import styles from './Styles/NavigationStyles';
import NavHeader from '../Components/NavHeader';
import DrivingSchoolInfo from '../Screens/NewDrivingSchool/Information';
import ScheduleBoundaries from '../Screens/NewDrivingSchool/ScheduleBoundaries';
import ScheduleSettings from '../Screens/NewDrivingSchool/ScheduleSettings';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import EmployeeProfileModule from '../Screens/EmployeeProfile/ModuleNavigator';
import { Colors } from '../Themes';

const routeConfigs = {
  loginLaunch: {
    screen: LaunchLoginPair
  },
  signUp: { screen: SignUpScreen },
  resetPassword: { screen: ResetPasswordScreen },
  mySchoolsScreen: { screen: MySchoolsScreen,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Profil'} close={true}/>
    }
  },
  employeeMain: {
    screen: EmployeeTabNavigator, navigationOptions: ({navigation}) => {
      return {
        header: <NavHeader navigation={navigation} title={navigation.state.params.drivingSchool.name}/>
      }
    }
  },
  ownerMain: {
    screen: OwnerTabNavigator, navigationOptions: ({navigation}) => {
      return {
        header: <NavHeader navigation={navigation} title={navigation.state.params.drivingSchool.name}/>
      }
    }
  },
  studentMain: {
    screen: StudentTabNavigator, navigationOptions: ({navigation}) => {
      return {
        header: <NavHeader navigation={navigation} title={navigation.state.params.drivingSchool.name}/>
      }
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
}

const navigationConfigs = {
  headerMode: 'float',
  initialRouteName: 'loginLaunch',
  cardStyle: styles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
