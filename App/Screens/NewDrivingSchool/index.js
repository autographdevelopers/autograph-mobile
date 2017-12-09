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

const routeConfigs = {
  step1: { screen: InformationStep },
  step2: { screen: NotificationsStep },
  step3: { screen: CalendarStep }
};

const navigationConfigs = {
  headerMode: 'none ',
  initialRouteName: 'step1',
  cardStyle: navStyles.card
};

export const StepFormNavigator = StackNavigator(routeConfigs, navigationConfigs);


class NewDrivingSchoolScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { currentStep: 0 };
  }
  nextStep = () => { /* this function declaration autobind this in oppose to func(){} */
    this.setState({currentStep: this.state.currentStep + 1});
    this.props.navigation.navigate(`step${this.state.currentStep + 2}`);
  };
  render() {
    return (
      <View style={{flex:1}}>
        <StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={this.state.currentStep}/>
        <StepFormNavigator navigation={this.props.navigation} />
        <ButtonPrimary onPress={this.nextStep}>Dalej</ButtonPrimary>
      </View>
    )
  }
}

NewDrivingSchoolScreen.router = StepFormNavigator.router;
export default NewDrivingSchoolScreen;
