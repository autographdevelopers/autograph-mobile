import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import styles from './Styles/NavigationStyles';
import NavHeader from '../Components/NavHeader';
import DefaultAvatar from '../Components/DefaultAvatar';
import { Fonts, Colors } from '../Themes/';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

import LaunchLoginPair from '../Screens/LaunchLoginPair/ModuleNavigator';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import SignUpScreen from '../Screens/SignUpScreen';

import NewDrivingSchoolWizardForm from '../Screens/NewDrivingSchool/index';

import InviteEmployeeWizardForm from '../Screens/Employees/Invite/InviteEmployeeWizardFormNavigatorScreen';
import InviteStudentForm from '../Screens/Students/InviteForm';

import ValidTimeFrames from '../Screens/NewDrivingSchool/ValidTimeFrames';
import DrivingSchoolInfo from '../Screens/NewDrivingSchool/Information';
import ScheduleSettings from '../Screens/NewDrivingSchool/ScheduleSettings';

import StudentProfile from '../Screens/StudentProfile/ModuleNavigator';
import EmployeeProfile from '../Screens/EmployeeProfile/ModuleNavigator';
import MySchoolsScreen from '../Screens/UserProfile/MySchoolsScreen';

import EmployeeFlow from './EmployeeFlow';
import StudentFlow from './StudentFlow';
import OwnerFlow from './OwnerFlow';

import EmployeeSearchableList from '../Components/EmployeesSearchableList';
import StudentSearchablelist from '../Components/StudentsSearchableList';

import PersonalSettings from '../Screens/PersonalSettings';

const primaryFlowNavigationOptions = ({navigation}) => {
  // TODO: refactor this shit
  const { routes, index, params } = navigation.state;
  let title;
  let rightIcon;
  let onRightIconPress;

  if (routes[index].routeName === 'schoolMain') {
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
};

/** == SCREENS GROUPS  ================== */
const SETTINGS_SCREENS = {
  editSchoolInfo: {
    screen: DrivingSchoolInfo,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Informacje'}/>
    }
  },
  editValidTimeFrames: {
    screen: ValidTimeFrames,
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
};

const PROFILE_SCREENS = {
  employeeProfile: {
    screen: EmployeeProfile,
    navigationOptions: { header: null }
  },
  studentProfile: {
    screen: StudentProfile,
    navigationOptions: { header: null }
  },
  mySchoolsScreen: {
    screen: MySchoolsScreen,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Profil'} back={false}/>
    }
  }
};

const INVITE_USER_SCREENS = {
  inviteEmployee: { screen: InviteEmployeeWizardForm },
  inviteStudent: { screen: InviteStudentForm }
};

const USERS_FLOWS_SCREENS = {
  employeeFlow: {
    screen: EmployeeFlow,
    navigationOptions: primaryFlowNavigationOptions
  },
  ownerFlow: {
    screen: OwnerFlow,
    navigationOptions: primaryFlowNavigationOptions
  },
  studentFlow: {
    screen: StudentFlow,
    navigationOptions: primaryFlowNavigationOptions
  }
};

const NOT_AUTHENTICATED_USER_SCREENS = {
  loginLaunch: {
    screen: LaunchLoginPair
  },
  signUp: { screen: SignUpScreen },
  resetPassword: { screen: ResetPasswordScreen },
};

const SEARCH_SCREENS = {
  searchEmployee: {
    screen: EmployeeSearchableList,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation}
                                  title={'Wybierz pracownika'}/>
    }
  },
  searchStudent: {
    screen: StudentSearchablelist,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation}
                                  title={'Wybierz kursanta'}/>
    }
  }
};

/** ==NAVIGATION SETUP================== */
const routeConfigs = {
  newDrivingSchool: { screen: NewDrivingSchoolWizardForm },
  personalSettings: { screen: PersonalSettings,
    navigationOptions: {
      header: props => <NavHeader navigation={props.navigation} title={'Ustawienia i Informacje'}/>
    }},
  ...SEARCH_SCREENS,
  ...NOT_AUTHENTICATED_USER_SCREENS,
  ...USERS_FLOWS_SCREENS,
  ...INVITE_USER_SCREENS,
  ...SETTINGS_SCREENS,
  ...PROFILE_SCREENS
};

const navigationConfigs = {
  headerMode: 'float',
  initialRouteName: 'loginLaunch',
  cardStyle: styles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
