import navStyles from '../../Navigation/Styles/NavigationStyles';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import InvitedEmployeesList from './InvitedEmployeesList';
import ActiveEmployeesList from './ActiveEmployeesList';
import SegmentsControl from '../../Components/SegmentsControl';
import { View } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';

const routeConfigs = {
  ActiveEmployeesList: {
    screen: ActiveEmployeesList,
  },
  InvitedEmployeesList: {
    screen: InvitedEmployeesList,
  },
};

const SEGMENTS = [
  { name: 'Aktywni', component: 'InvitedEmployeesList' },
  { name: 'Zaproszeni', component: 'InvitedEmployeesList' },
];

const navigationConfigs = {
  navigationOptions: {
    header: props => {
      const handlePress = index => {
        index === 1 ?
          props.navigation.navigate(SEGMENTS[index].component) :
          props.navigation.goBack(null);
      };
      return <SegmentsControl
        componentProps={{
          values: SEGMENTS.map(segment => segment.name),
          selectedIndex: props.navigation.state.index,
          onTabPress: handlePress,
        }}/>;
    }
  },
  initialRouteName: 'ActiveEmployeesList',
  cardStyle: navStyles.card,
};

const ModuleNavigator = StackNavigator(routeConfigs, navigationConfigs);

class EmployeesModule extends Component {
  static navigationOptions = {header: null}

  goToInviteEmployee = () => {
    this.props.navigation.navigate('inviteEmployee');
  };

  render() {
    const { navigation, screenProps } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ModuleNavigator screenProps={screenProps} navigation={navigation} />

        <ButtonPrimary float={true} onPress={this.goToInviteEmployee}>
          Dodaj pracownika
        </ButtonPrimary>
      </View>
    );
  }
}

EmployeesModule.router = ModuleNavigator.router;

export default EmployeesModule;
