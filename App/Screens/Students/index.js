import { StackNavigator } from 'react-navigation';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import InvitedStudents from './Invited';
import ActiveStudents from './Active';
import React, { Component } from 'react';
import SegmentsControl from '../../Components/SegmentsControl';

const routeConfigs = {
  ActiveStudentsList: {
    screen: ActiveStudents
  },
  InvitedStudentsList: {
    screen: InvitedStudents
  }
};

const SEGMENTS = [
  { name: 'Aktywni', component: 'ActiveStudentsList' },
  { name: 'Zaproszeni', component: 'InvitedStudentsList' }
];

const navigationConfigs = {
  navigationOptions: {
    header: props => {
      const handlePress = index => {
        index === 1 ? props.navigation.navigate(SEGMENTS[index].component) : props.navigation.goBack(null);
      };
      return <SegmentsControl
        componentProps={{
          values: SEGMENTS.map(segment => segment.name),
          selectedIndex: props.navigation.state.index,
          onTabPress: handlePress
        }}/>
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  },
  initialRouteName: 'ActiveStudentsList',
  cardStyle: navStyles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
