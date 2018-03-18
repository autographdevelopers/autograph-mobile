import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import LaunchLoginPair from '../Screens/LaunchLoginPair/ModuleNavigator';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import NewDrivingSchoolWizardForm from '../Screens/NewDrivingSchool/index';
import InviteEmployeeWizardForm from '../Screens/Employees/Invite/InviteEmployeeWizardFormNavigatorScreen';
import InviteStudentForm from '../Screens/Students/InviteForm';

import styles from './Styles/NavigationStyles';
import NavHeader from '../Components/NavHeader';
import DrivingSchoolInfo from '../Screens/NewDrivingSchool/Information';
import ScheduleBoundaries from '../Screens/NewDrivingSchool/ValidTimeFrames';
import ScheduleSettings from '../Screens/NewDrivingSchool/ScheduleSettings';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';
import EmployeeProfileModule from '../Screens/EmployeeProfile/ModuleNavigator';
import DefaultAvatar from '../Components/DefaultAvatar';
import { Fonts, Colors } from '../Themes/'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';


import PrimaryFlow from './PrimaryFlow';

const routeConfigs = {
  loginLaunch: {
    screen: LaunchLoginPair
  },
  signUp: { screen: SignUpScreen },
  resetPassword: { screen: ResetPasswordScreen },
  mySchoolsScreen: {
    screen: MySchoolsScreen,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Profil'} back={false}/>
    }
  },
  primaryFlow: {
    screen: PrimaryFlow,
    navigationOptions: ({navigation}) => {
      const { routes, index, params } = navigation.state;
      let title;
      let rightIcon;
      let onRightIconPress;

      if (['ownerMain', 'employeeMain', 'studentMain'].includes(routes[index].routeName)) {
        title = params.drivingSchool.name;
        rightIcon = <DefaultAvatar name={params.user.name} customSize={25}/>;
        onRightIconPress = () => navigation.navigate('mySchoolsScreen');
      } else if (routes[index].routeName === 'mySchoolsScreen') {
        title = 'Profile';
        rightIcon = <EvilIconsIcon name={'close'} size={30} color={Colors.snow}/>;
        onRightIconPress = () => navigation.goBack(null);
      }

      return {
        header: <NavHeader navigation={navigation}
                           title={title}
                           rightIcon={rightIcon}
                           onRightIconPress={onRightIconPress}
                           back={false}/>
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
