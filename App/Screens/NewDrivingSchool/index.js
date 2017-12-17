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

    this.screenSubmitActions = {
      step0: (values, formId, redirect) => ( drivingSchoolActionCreators.createDrivingSchoolRequest(values, formId, redirect) ),
      step1: () => ({type: 'dupa'}),
      step2: () => ({type: 'dupa'})
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  bindScreenRef = (key, ref) => {
    this.screensRefs[key] = ref
  };

  nextStep = () => { /* this function declaration autobind this in oppose to func(){}  really? i thought arrows does NOT autobind*/
    console.log('in next step');
    const {index, routes} = this.navigator.state.nav;
    const currentRouteName = routes[index].routeName;
    const nextRouteIndex = index + 1;
    const redirectAction = NavigationActions.navigate({ routeName: `step${nextRouteIndex}`});

    this.screensRefs[currentRouteName].props.handleSubmit( values => {
      console.log('in handle submit');
      this.props.navigation.dispatch(this.screenSubmitActions[currentRouteName](values, 'newDrivingSchool', redirectAction));
    })();
  };

  // TODO add ActivityIndicator spinner form react-native module

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
