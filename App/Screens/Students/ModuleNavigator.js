import { StackNavigator } from 'react-navigation';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import InvitedStudents from './InvitedSegment';
import ActiveStudents from './ActivesSegment';
import React, { Component } from 'react';
import SegmentsControl from '../../Components/SegmentsControl';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { View } from 'react-native';

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

const ModuleNavigator = StackNavigator(routeConfigs, navigationConfigs);

class StudentsModule extends Component {

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ModuleNavigator
          screenProps={{ parentNav: navigation }}
          navigation={navigation}/>
        <ButtonPrimary float={true} onPress={()=>this.props.navigation.navigate('inviteStudent')}>Dodaj kursanta</ButtonPrimary>
      </View>
    );
  }
}

StudentsModule.router = ModuleNavigator.router;

export default StudentsModule;

