import navStyles from '../../Navigation/Styles/NavigationStyles';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import InvitedEmployeesList from './InvitedEmployeesList';
import SegmentsControl from '../../Components/SegmentsControl';

const routeConfigs = {
  ActiveEmployeesList: {
    screen: InvitedEmployeesList
  },
  InvitedEmployeesList: {
    screen: InvitedEmployeesList
  }
};
const SEGMENTS = [
  { name: 'Aktywni', component: 'InvitedEmployeesList' },
  { name: 'Zaproszeni', component: 'InvitedEmployeesList' }
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
  initialRouteName: 'ActiveEmployeesList',
  cardStyle: navStyles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
