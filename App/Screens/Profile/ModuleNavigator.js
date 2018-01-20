import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EmployeeProfile from './Profile';
import EmployeeManagement from './ManageEmployee';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import ProfileHeader from '../../Components/ProfileHeader';

const routeConfigs = {
  employeeProfile: {
    screen: EmployeeProfile,

  },
  manageEmployee: {
    screen: EmployeeManagement,
  },
};

const navigationConfigs = {
  navigationOptions: (props) => {
    const { navigation } = props;
    const { user, index, title } = navigation.state.params;
    return {
      header:
        <View>
          <NavHeader navigation={navigation} title={title}/>
          <ProfileHeader
            onManagePersonClick={() => navigation.navigate(
              'manageEmployee', { user, index, title: 'Manage Employee' })}
            avatarProps={{ name: user.name, index }}
            aniamationable={true}
            user={user}/>
        </View>
      ,
      headerStyle: { elevation: 0, shadowOpacity: 0 },
    };
  },
  initialRouteName: 'employeeProfile',
  initialRouteParams: { title: 'Profile' },
  cardStyle: navStyles.card,
};

const ProfileNavigation = StackNavigator(routeConfigs, navigationConfigs);

export default class EmployeeProfileModule extends Component {
  static navigationOptions = { header: null };

  render() {
    const { user, index, setCurrentEmployee } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <ProfileNavigation navigation={this.props.navigation}
                           screenProps={{ user, index, setCurrentEmployee }}/>
      </View>
    );
  }
}

EmployeeProfileModule.router = ProfileNavigation.router;
