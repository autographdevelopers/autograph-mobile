import navStyles from '../../Navigation/Styles/NavigationStyles';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import InvitedEmployeesList from './InvitedEmployeesList';
import ActiveEmployeesList from './ActiveEmployeesList';
import SegmentsControl from '../../Components/SegmentsControl';
import { connect } from 'react-redux';
import { contextActionCreators } from '../../Redux/ContextRedux';

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
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 },
  },
  initialRouteName: 'ActiveEmployeesList',
  cardStyle: navStyles.card,
};

const ModuleNavigator = StackNavigator(routeConfigs, navigationConfigs);

class EmployeesModule extends Component {

  render() {
    const { setCurrentEmployee, navigation } = this.props;

    return (
      <ModuleNavigator
        screenProps={{ parentNav: navigation, setCurrentEmployee }}
        navigation={navigation}/>
    );
  }
}

EmployeesModule.router = ModuleNavigator.router;

const mapDispatchToProps = dispatch => ( {
  setCurrentEmployee: id => dispatch(
    contextActionCreators.setCurrentEmployee(id)),
} );

export default connect(null, mapDispatchToProps)(EmployeesModule);
