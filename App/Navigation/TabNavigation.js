import ActivitiesScreen from '../Screens/ActivitiesScreen';
import CalendarScreen from '../Screens/CalendarScreen';
import EmployeesScreen from '../Screens/Employees/ModuleNavigator';
import StudentsScreen from '../Screens/Students/ModuleNavigator';
import SettingsScreen from '../Screens/SettingsScreen';
import { TabNavigator } from 'react-navigation';
import { Colors, Fonts } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import I18n from '../I18n';
import NavHeader from '../Components/NavHeader';

const routesConfigs = {
  activities: {
    screen: ActivitiesScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('activities'),
      tabBarIcon: ({ tintColor }) => (<Icon size={25} name={'bell'} color={tintColor}/> ),
    }
  },
  calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('calendar'),
      tabBarIcon: ({ tintColor }) => (<Icon size={25} name={'calendar'} color={tintColor}/> ),
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
  settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('settings'),
      tabBarIcon: ({ tintColor }) => (<IconF size={25} name={'cog'} color={tintColor}/> ),
    }
  }
};

const navigationConfig = {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: Colors.primaryWarm,
    labelStyle: {
      fontFamily: Fonts.type.regular,
    }
  }
};

export default TabNavigator(routesConfigs, navigationConfig);
