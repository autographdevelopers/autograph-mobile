import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import Layout from '../../Components/Layout';
import { Fonts, Colors } from '../../Themes/index';
import StepsIndicators from '../../Components/StepsIndicators';
import { required, isAccepted, minLength, passwordsMatch, email } from '../../Lib/validators';
import PlacesAutocomplete from '../../Components/PlacesAutocomplete';
import { StackNavigator } from 'react-navigation';
import InformationStep from './Information';
import NotificationsStep from './Notifications';
import CalendarStep from './Calendar';
import navStyles from '../../Navigation/Styles/NavigationStyles';

const routeConfigs = {
  step1: { screen: InformationStep },
  step2: { screen: NotificationsStep },
  // step3: { screen: CalendarStep }
};

const navigationConfigs = {
  headerMode: 'none ',
  initialRouteName: 'step1',
  cardStyle: navStyles.card
};

export const StepFormNavigator = StackNavigator(routeConfigs, navigationConfigs);

const styles = StyleSheet.create({
  removableInputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

class NewDrivingSchoolScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { currentStep: 0 };
  }
  nextStep = () => {
    this.setState({currentStep: this.state.currentStep + 1});
    this.navigator.navigate(`step${this.state.currentStep + 2}`);
  };

  render() {
    return (
      <Layout>
        {/*<StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={this.state.currentStep}/>*/}
        {/*<StepFormNavigator navigation={this.props.navigation} ref={nav => { this.navigator = nav; }}/>*/}
        {/*/!*<ButtonPrimary onPress={this.nextStep}>Dalej</ButtonPrimary>*!/*/}
        {/*<InformationStep/>*/}
      </Layout>
    )
  }
}

NewDrivingSchoolScreen.router = StepFormNavigator.router;
export default NewDrivingSchoolScreen;
