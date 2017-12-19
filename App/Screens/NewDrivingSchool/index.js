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
    this.screensRefs = { /*step1, step2, step3*/ };

    this.state = {
      submitting: false
    };

    this.screenSubmitActions = {
      step0: (values, formId, redirect) => (drivingSchoolActionCreators.createDrivingSchoolRequest(values, formId, redirect)),
      step1: (values, formId, redirect) => (drivingSchoolActionCreators.updateEmployeeNotificationsRequest(values, formId, redirect)),
      step2: (values, formId, redirect) => (drivingSchoolActionCreators.updateScheduleBoundariesRequest(values, formId, redirect))
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  toggleSubmitting = () => {
    this.setState({ submitting: !this.state.submitting })
  };

  bindScreenRef = (key, ref) => {
    this.screensRefs[key] = ref;
  };

  nextStep = () => { /* this function declaration autobind this in oppose to func(){}  really? i thought arrows does NOT autobind*/
    const { index, routes } = this.props.navigation.state;
    const currentRouteName = routes[index].routeName;
    const nextRouteIndex = index + 1;
    const nextRoute = currentRouteName === 'step2' ? 'main' : `step${nextRouteIndex}`;
    const redirectAction = NavigationActions.navigate({ routeName: nextRoute });

    console.log('current route name: ');
    console.log(FormIDs[currentRouteName]);

    // TODO: why doesnt work with loader??

    this.screensRefs[currentRouteName].props.handleSubmit(values => {
      this.props.navigation.dispatch(this.screenSubmitActions[currentRouteName](values, FormIDs[currentRouteName], redirectAction));
    })();

  };

  render() {
    const { index, routes } = this.props.navigation.state;
    const currentRouteName = routes[index].routeName;
    const currentForm = FormIDs[currentRouteName];

    return (
      <View style={{ flex: 1 }}>
        <StepFormNavigator navigation={this.props.navigation} screenProps={{
          bindScreenRef: this.bindScreenRef,
          toggleSubmitting: this.toggleSubmitting
        }}/>

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
