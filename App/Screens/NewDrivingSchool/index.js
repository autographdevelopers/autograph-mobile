import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import Layout from '../../Components/Layout';
import { Fonts, Colors } from '../../Themes/index';
import StepsIndicators from '../../Components/StepsIndicators';
import { StackNavigator } from 'react-navigation';
import InformationStep from './Information';
import NotificationsStep from './Notifications';
import CalendarStep from './Calendar';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import {NavigationActions} from 'react-navigation';
import API from '../../Services/Api';
import { SubmissionError } from 'redux-form';

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
    this.screensRefs = {
      /*screen1, screen2, screen3*/
    };

    const api = API.create();

    this.screenSubmitRequests = {
      step0: api.createDrivingSchool,
      step1: api.updateEmployeeNotifications,
      step2: api.updateScheduleBoundaries
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  bindScreenRef = (key, ref) => {
    this.screensRefs[key] = ref
  };

  submitCurrentForm = (currentRouteName, redirect) => {
    console.log('API function');
    console.log(this.screenSubmitRequests);

    this.screensRefs[currentRouteName].props.handleSubmit( values => {
      console.log(values);
      console.log(currentRouteName);
      return this.screenSubmitRequests[currentRouteName]({id: 1, data: values})
        .then(response => {
          if (response.ok) {
            console.log('response OK');
            redirect();
          } else {
            console.log('response not OK');
            const errors = {};
            Object.keys(response.data).forEach(field => {
              errors[field] = { all: response.data[field] }
            });
            throw new SubmissionError(errors);
          }
        })
    })();
  };

  nextStep = () => { /* this function declaration autobind this in oppose to func(){}  really? i thought arrows does NOT autobind*/
    const {index, routes} = this.navigator.state.nav;
    const currentRouteName = routes[index].routeName;

    const redirectCallback = () => {
      const nextRouteIndex = index + 1;
      this.navigator && this.navigator.dispatch(
        NavigationActions.navigate({ routeName: `step${nextRouteIndex}`})
      );
    };

    this.submitCurrentForm(currentRouteName, redirectCallback);
  };

  render() {
    return (
      <View style={{flex:1}}>
        <StepFormNavigator ref={ref => this.navigator = ref} screenProps={{parentNav: this.props.navigation, bindScreenRef: this.bindScreenRef }}/>
        <ButtonPrimary onPress={this.nextStep}>Dalej</ButtonPrimary>
      </View>
    )
  }
}

// NewDrivingSchoolScreen.router = StepFormNavigator.router;
export default NewDrivingSchoolScreen;
