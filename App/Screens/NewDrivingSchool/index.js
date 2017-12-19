import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/index';
import { StackNavigator } from 'react-navigation';
import InformationStep from './Information';
import NotificationsStep from './Notifications';
import CalendarStep from './Calendar';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import { NavigationActions } from 'react-navigation';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';
import { connect } from 'react-redux'

const routeConfigs = {
  step0: { screen: InformationStep },
  step1: { screen: NotificationsStep },
  step2: { screen: CalendarStep }
};

const navigationConfigs = {
  // headerMode: 'none ',
  initialRouteName: 'step0',
  cardStyle: navStyles.card
};

export const StepFormNavigator = StackNavigator(routeConfigs, navigationConfigs);

class NewDrivingSchoolScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.screensInfo = {
      step0: {
        formID: 'newDrivingSchool',
        submitAction: (values, formId, redirect) => (drivingSchoolActionCreators.createDrivingSchoolRequest(values, formId, redirect)),
        title: 'Information',
        ref: null
      },
      step1: {
        formID: 'notificationSettings',
        submitAction: (values, formId, redirect) => (drivingSchoolActionCreators.updateEmployeeNotificationsRequest(values, formId, redirect)),
        title: 'Notifications',
        ref: null
      },
      step2: {
        formID: 'scheduleBoundaries',
        submitAction: (values, formId, redirect) => (drivingSchoolActionCreators.updateScheduleBoundariesRequest(values, formId, redirect)),
        title: 'Schedule Boundaries',
        ref: null
      }
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  bindScreenRef = (key, ref) => {
    this.screensInfo[key].ref = ref;
  };

  nextStep = () => {
    const { index, routes } = this.props.navigation.state,
      currentRouteName = routes[index].routeName,
      nextRouteIndex = index + 1,
      nextRoute = currentRouteName === 'step2' ? 'main' : `step${nextRouteIndex}`,
      redirectAction = NavigationActions.navigate({ routeName: nextRoute });

    this.screensInfo[currentRouteName].ref.props.handleSubmit(values => {
      const {formID} = this.screensInfo[currentRouteName];
      this.props.navigation.dispatch(this.screensInfo[currentRouteName].submitAction(values, formID, redirectAction));
    })();
  };

  render() {
    const { index, routes } = this.props.navigation.state;
    const currentRouteName = routes[index].routeName;
    const currentForm = this.screensInfo[currentRouteName].formID;

    return (
      <View style={{ flex: 1 }}>
        <StepFormNavigator navigation={this.props.navigation} screenProps={{ bindScreenRef: this.bindScreenRef}}/>

        {this.props.form[currentForm] && this.props.form[currentForm].submitting
          ?
          <View style={{ marginBottom: 40 }}><ActivityIndicator size={'large'} color={Colors.primaryWarm}/></View>
          :
          <ButtonPrimary onPress={this.nextStep}>Dalej</ButtonPrimary>
        }
      </View>
    )
  }
}

NewDrivingSchoolScreen.router = StepFormNavigator.router;

const mapStateToProps = state => ({form: state.form});

export default connect(mapStateToProps, null)(NewDrivingSchoolScreen);
