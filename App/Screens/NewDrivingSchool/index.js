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
  }
  nextStep2 =() => {
    this.props.navigation.goBack()
  }

  nextStep = () => { /* this function declaration autobind this in oppose to func(){} */
    const nextRoute = this.navigator.state.nav.index + 1;
    this.navigator && this.navigator.dispatch(
      NavigationActions.navigate({ routeName: `step${nextRoute}`})
    );
  };
  render() {
    return (
      <View style={{flex:1}}>
        <StepFormNavigator ref={ref => this.navigator = ref} screenProps={{parentNav: this.props.navigation }}/>
        <ButtonPrimary onPress={this.nextStep}>Dalej</ButtonPrimary>
      </View>
    )
  }
}

// NewDrivingSchoolScreen.router = StepFormNavigator.router;
export default NewDrivingSchoolScreen;
