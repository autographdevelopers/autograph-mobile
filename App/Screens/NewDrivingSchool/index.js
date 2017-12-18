import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import Layout from '../../Components/Layout';
import { Fonts, Colors } from '../../Themes/index';
import StepsIndicators from '../../Components/StepsIndicators';
import { StackNavigator } from 'react-navigation';
import InformationStep from './Information';
import NotificationsStep from './Notifications';
import CalendarStep from './Calendar';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import { NavigationActions } from 'react-navigation';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';

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

const FormIDs = {
  step0: 'newDrivingSchool',
  step1: 'notificationSettings',
  step2: 'scheduleBoundaries'
};

export const StepFormNavigator = StackNavigator(routeConfigs, navigationConfigs);

class NewDrivingSchoolScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.screensRefs = { /*step1, step2, step3*/};

    this.state = {
      submitting: false
    };

    this.screenSubmitActions = {
      step0: (values, formId, redirect) => (drivingSchoolActionCreators.createDrivingSchoolRequest(values, formId, redirect)),
      step1: (values, formId, redirect) => (drivingSchoolActionCreators.updateEmployeeNotificationsRequest(values, formId, redirect)),
      step2: () => ({ type: 'dupa' })
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  toggleSubmitting = () => {
    this.setState({submitting: !this.state.submitting})
  };

  bindScreenRef = (key, ref) => {
    this.screensRefs[key] = ref;
  };

  nextStep = () => { /* this function declaration autobind this in oppose to func(){}  really? i thought arrows does NOT autobind*/
    const { index, routes } = this.props.navigation.state;
    const currentRouteName = routes[index].routeName;
    const nextRouteIndex = index + 1;
    const redirectAction = NavigationActions.navigate({ routeName: `step${nextRouteIndex}` });

    this.screensRefs[currentRouteName].props.handleSubmit(values => {
      console.log('params:::');
      console.log(values);
      console.log(FormIDs[currentRouteName]);
      console.log(redirectAction);

      this.props.navigation.dispatch(this.screenSubmitActions[currentRouteName](values, FormIDs[currentRouteName], redirectAction));
    })();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StepFormNavigator navigation={this.props.navigation} screenProps={{bindScreenRef: this.bindScreenRef, toggleSubmitting: this.toggleSubmitting }}/>

        { this.state.submitting
          ?
          <ActivityIndicator size={'large'} color={Colors.primaryWarm}/>
          :
          <ButtonPrimary onPress={this.nextStep}>Dalej</ButtonPrimary>
        }
      </View>
    )
  }
}

NewDrivingSchoolScreen.router = StepFormNavigator.router;

export default NewDrivingSchoolScreen;
