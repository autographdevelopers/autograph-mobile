import { StackNavigator } from 'react-navigation';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import InvitedStudentsList from './InvitedStudentsList';
import ActiveStudentsList from './ActiveStudentsList';
import React, { Component } from 'react';
import SegmentsControl from '../../Components/SegmentsControl';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { View } from 'react-native';
import FullScreenInformation from '../../Components/FullScreenInformation';
import { canManageStudents } from '../../Lib/AuthorizationHelpers'
import I18n from '../../I18n/index';
import { connect } from 'react-redux';

const routeConfigs = {
  ActiveStudentsList: {
    screen: ActiveStudentsList
  },
  InvitedStudentsList: {
    screen: InvitedStudentsList
  }
};

const SEGMENTS = [
  { name: 'Aktywni', component: 'ActiveStudentsList' },
  { name: 'Zaproszeni', component: 'InvitedStudentsList' }
];

const navigationConfigs = {
  navigationOptions: (props) => {
    return {
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
            onTabPress: handlePress
          }}/>
      }
    }
  },
  initialRouteName: 'ActiveStudentsList',
  cardStyle: navStyles.card
};

const ModuleNavigator = StackNavigator(routeConfigs, navigationConfigs);

class StudentsModule extends Component {

  render() {
    const { navigation, drivingSchool } = this.props;

    if(!canManageStudents(drivingSchool))
      return <FullScreenInformation>{I18n.t('lacksPrivileges.canManageStudent')}</FullScreenInformation>

    return (
      <View style={{ flex: 1 }}>
        <ModuleNavigator
          navigation={navigation}/>
        <ButtonPrimary float={true} onPress={()=>navigation.navigate('inviteStudent')}>Dodaj kursanta</ButtonPrimary>
      </View>
    );
  }
}

StudentsModule.router = ModuleNavigator.router;

const mapStateToProps = ({ drivingSchools, context }) => ( {
  drivingSchool: drivingSchools.hashMap[context.currentDrivingSchoolID]
} );

export default connect(mapStateToProps)(StudentsModule);
