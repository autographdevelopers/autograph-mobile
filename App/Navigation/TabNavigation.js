import ActivitiesScreen from '../Screens/ActivitiesScreen';
import CalendarScreen from '../Screens/CalendarScreen';
import EmployeesScreen from '../Screens/EmployeesScreen';
import StudentsScreen from '../Screens/Students/index';
import SettingsScreen from '../Screens/SettingsScreen';
import { TabNavigator } from 'react-navigation';
import { Colors } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';

const routesConfigs = {
  activities: {
    screen: ActivitiesScreen,
    navigationOptions: {
      tabBarLabel: 'Activities',
      tabBarIcon: ({ tintColor }) => (<Icon size={30} name={'bell'} color={tintColor}/> ),
      labelStyle: {
        fontSize: 15,
      }
    }
  },
  calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      tabBarLabel: 'Calendar',
      tabBarIcon: ({ tintColor }) => (<Icon size={30} name={'calendar'} color={tintColor}/> ),
      labelStyle: {
        fontSize: 15,
      }
    }
  },
  employees: {
    screen: EmployeesScreen,
    navigationOptions: {
      tabBarLabel: 'Employees',
      tabBarIcon: ({ tintColor }) => (<IconE size={30} name={'user'} color={tintColor}/> ),
      labelStyle: {
        fontSize: 15,
      }
    }
  },
  students: {
    screen: StudentsScreen,
    navigationOptions: {
      tabBarLabel: 'Students',
      tabBarIcon: ({ tintColor }) => (<IconE size={30} name={'user'} color={tintColor}/> ),
      labelStyle: {
        fontSize: 15,
      }
    }
  },
  settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (<IconF size={30} name={'cog'} color={tintColor}/> ),
      labelStyle: {
        fontSize: 15,
      }
    }
  }
};

const navigationConfig = {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: Colors.primaryWarm
  }
};

export default TabNavigator(routesConfigs, navigationConfig);
