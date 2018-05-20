import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {TouchableOpacity} from 'react-native';
import withFluidLayout from '../HOC/withFluidLayout';

import NavigationHeaderBackground from '../Components/NavigationHeaderBackground';

import styles from './Styles/NavigationStyles';
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

import DrivingLessonsFullListScreen from '../Screens/DrivingLessonsFullListScreen';
import ActivitiesFullListScreen from '../Screens/ActivitiesFullListScreen';

import EmployeeFlow from './EmployeeFlow';
import StudentFlow from './StudentFlow';
import OwnerFlow from './OwnerFlow';

import EmployeeSearchableList from '../Components/EmployeesSearchableList';
import StudentSearchablelist from '../Components/StudentsSearchableList';

import PersonalSettings from '../Screens/PersonalSettings';

import EmployeeDailyAgenda from '../Screens/EmployeeDailyAgenda';
import I18n from '../I18n';
import { STACK_TRANSITION_DURATION } from '../Config/NavigationConfig';

const primaryFlowNavigationOptions = ({navigation}) => {
  const { routes, index, params } = navigation.state;
  let title;
  let rightIcon;
  let onRightIconPress;

  if (routes[index].routeName === 'schoolMain') {
    title = params.drivingSchool.name;
    onRightIconPress = () => navigation.navigate('mySchoolsScreen');
    rightIcon =
      <TouchableOpacity onPress={onRightIconPress}>
        <DefaultAvatar name={params.user.name} customSize={25}/>
      </TouchableOpacity>
  } else if (routes[index].routeName === 'mySchoolsScreen') {
    title = 'Profil';
    onRightIconPress = () => navigation.goBack(null);
    rightIcon =
      <TouchableOpacity onPress={onRightIconPress}>
        <EvilIconsIcon name={'close'} size={30} color={Colors.snow}/>
      </TouchableOpacity>
  }

  return {
    title,
    headerTitle: title,
    headerRight: rightIcon,
    headerLeft: null,
  }
};

/** == SCREENS GROUPS  ================== */
const SETTINGS_SCREENS = {
  editSchoolInfo: {
    screen: withFluidLayout(DrivingSchoolInfo),
    navigationOptions: {
      headerTitle: 'Informacje',
      title: 'Info'
    }
  },
  editValidTimeFrames: {
    screen: withFluidLayout(ValidTimeFrames),
    navigationOptions: {
      headerTitle: 'Godziny jazd',
      title: 'Godziny jazd'
    }
  },
  editScheduleSettings: {
    screen: withFluidLayout(ScheduleSettings),
    navigationOptions: {
      headerTitle: 'Ustawienia kalendarza',
      title: 'Ustawienia kalendarza'
    }
  },
};

const PROFILE_SCREENS = {
  employeeProfile: {
    screen: EmployeeProfile,
    navigationOptions: {
      header: null
    }
  },
  studentProfile: {
    screen: StudentProfile,
    navigationOptions: {
      header: null
    }
  },
  mySchoolsScreen: {
    screen: withFluidLayout(MySchoolsScreen),
    navigationOptions: {
      headerTitle: 'Profil',
      title: 'Profil'
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
    screen: LaunchLoginPair,
  },
  signUp: {
    screen: withFluidLayout(SignUpScreen),
    navigationOptions: {
      headerTitle: 'Załóż konto',
      title: 'Załóż konto',
    }
  },
  resetPassword: {
    screen: withFluidLayout(ResetPasswordScreen),
    navigationOptions: {
      headerTitle: I18n.t('recover_password'),
      title: I18n.t('recover_password'),
    }
  },
};

const DRIVING_LESSONS = {
  drivingLessons: {
    screen: withFluidLayout(DrivingLessonsFullListScreen),
    navigationOptions: {
      title: 'Lista jazd',
      headerTitle: 'Lista jazd',
    }
  }
};

const ACTIVITIES = {
  activitiesFullList: {
    screen: withFluidLayout(ActivitiesFullListScreen),
    navigationOptions: {
      title: 'Lista aktywności',
      headerTitle: 'Lista aktywności',
    }
  }
};

const SEARCH_SCREENS = {
  searchEmployee: {
    screen: EmployeeSearchableList,
    navigationOptions: {
      title: 'Wybierz pracownika',
      headerTitle: 'Wybierz pracownika'
    }
  },
  searchStudent: {
    screen: StudentSearchablelist,
    navigationOptions: {
      title: 'Wybierz kursanta',
      headerTitle: 'Wybierz kursanta'
    }
  }
};

/** ==NAVIGATION SETUP================== */
const routeConfigs = {
  newDrivingSchool: {
    screen: NewDrivingSchoolWizardForm,
    navigationOptions: {
      headerTitle: 'Zarejestruj szkołę',
      title: 'Zarejestruj szkołę'
    }
  },
  personalSettings: {
    screen: PersonalSettings,
    navigationOptions: {
      title: 'Ustawienia i Informacje',
      headerTitle: 'Ustawienia i Informacje'
    }},
  employeeDailyAgenda: {
    screen: EmployeeDailyAgenda,
    navigationOptions: ({navigation: { state: { params: { employee }}}}) => ({
      title: `${employee.name} ${employee.surname}`,
      headerTitle: `${employee.name} ${employee.surname}`
    })
  },
  ...SEARCH_SCREENS,
  ...NOT_AUTHENTICATED_USER_SCREENS,
  ...USERS_FLOWS_SCREENS,
  ...INVITE_USER_SCREENS,
  ...SETTINGS_SCREENS,
  ...PROFILE_SCREENS,
  ...DRIVING_LESSONS,
  ...ACTIVITIES
};

const navigationConfigs = {
  headerMode: 'screen',
  mode: 'card',
  initialRouteName: 'loginLaunch',
  cardStyle: styles.card,
  transitionConfig: () => ({
    containerStyle: {
      backgroundColor: 'transparent',
      duration: STACK_TRANSITION_DURATION
    }
  }),
  navigationOptions: {
    headerTruncatedBackTitle: null,
    headerBackTitle: null,
    headerTintColor: 'white',
    headerBackground: <NavigationHeaderBackground/>,
    headerMode: 'screen',
    headerTitleStyle: {
      fontFamily: Fonts.type.base,
      fontWeight: '400'
    },
    headerStyle: {
      borderBottomWidth: 0
    }
  }
};

export default StackNavigator(routeConfigs, navigationConfigs);
