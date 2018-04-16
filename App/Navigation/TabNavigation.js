import ActivitiesScreen from '../Screens/ActivitiesScreen';
import EmployeesSummaryAgendaScreen from '../Screens/SummaryAgendaFetcher';
import EmployeesScreen from '../Screens/Employees/index';
import StudentsScreen from '../Screens/Students/index';
import SettingsScreen from '../Screens/SettingsScreen';
import DrivingSchoolInformation from '../Screens/DrivingSchoolInformation';
import { TabNavigator } from 'react-navigation';
import { Colors, Fonts } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/EvilIcons';
import IconsOcticons from 'react-native-vector-icons/Octicons';
import React, { Component } from 'react';
import I18n from '../I18n';

const employeeRoutesConfigs = {
  calendar: {
    screen: EmployeesSummaryAgendaScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('calendar'),
      tabBarIcon: ({ tintColor }) => (<IconsOcticons size={25} name={'calendar'} color={tintColor}/> ),
    }
  },
  employees: {
    screen: EmployeesScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('employees'),
      tabBarIcon: ({ tintColor }) => (<IconE size={25} name={'user'} color={tintColor}/> ),
    }
  },
  students: {
    screen: StudentsScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('students'),
      tabBarIcon: ({ tintColor }) => (<IconF size={25} name={'graduation-cap'} color={tintColor}/> ),
    }
  },
  activities: {
    screen: ActivitiesScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('activities'),
      tabBarIcon: ({ tintColor }) => (<Icon size={25} name={'bell'} color={tintColor}/> ),
    }
  }
};

const ownerRoutesConfigs = {
  calendar: {
    screen: EmployeesSummaryAgendaScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('calendar'),
      tabBarIcon: ({ tintColor }) => (<IconsOcticons size={25} name={'calendar'} color={tintColor}/> ),
    }
  },
  employees: {
    screen: EmployeesScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('employees'),
      tabBarIcon: ({ tintColor }) => (<IconE size={25} name={'user'} color={tintColor}/> ),
    }
  },
  students: {
    screen: StudentsScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('students'),
      tabBarIcon: ({ tintColor }) => (<IconF size={25} name={'graduation-cap'} color={tintColor}/> ),
    }
  },
  activities: {
    screen: ActivitiesScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('activities'),
      tabBarIcon: ({ tintColor }) => (<Icon size={25} name={'bell'} color={tintColor}/> ),
    }
  },
  settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('settings'),
      tabBarIcon: ({ tintColor }) => (<IconF size={25} name={'cog'} color={tintColor}/> ),
    }
  }
};


const studentRoutesConfigs = {
  calendar: {
    screen: EmployeesSummaryAgendaScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('myCourse'),
      tabBarIcon: ({ tintColor }) => (<Icon size={25} name={'view-dashboard'} color={tintColor}/> ),
    }
  },
  employees: {
    screen: EmployeesScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('enroll'),
      tabBarIcon: ({ tintColor }) => (<IconFeather size={25} name={'edit'} color={tintColor}/> ),
    }
  },
  activities: {
    screen: ActivitiesScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('activities'),
      tabBarIcon: ({ tintColor }) => (<Icon size={25} name={'bell'} color={tintColor}/> ),
    }
  },
  drivingSchoolInformation: {
    screen: DrivingSchoolInformation,
    navigationOptions: {
      tabBarLabel: I18n.t('driving_school_information'),
      tabBarIcon: ({ tintColor }) => (<Icon size={25} name={'information-outline'} color={tintColor}/> ),
    }
  }
}

const navigationConfig = {
  animationEnabled: true,
  // lazy: true,
  tabBarOptions: {
    activeTintColor: Colors.primaryWarm,
    labelStyle: {
      fontFamily: Fonts.type.regular,
    }
  }
};

export const OwnerTabNavigator = TabNavigator(ownerRoutesConfigs, navigationConfig);
export const EmployeeTabNavigator = TabNavigator(employeeRoutesConfigs, navigationConfig);
export const StudentTabNavigator = TabNavigator(studentRoutesConfigs, navigationConfig);
