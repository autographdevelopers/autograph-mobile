import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/index';
import { StackNavigator } from 'react-navigation';
import InformationStep from './Information';
import NotificationsStep from './Notifications';
import CalendarStep from './Calendar';
import ScheduleSettings from './ScheduleSettings';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import { NavigationActions } from 'react-navigation';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';
import { connect } from 'react-redux'
import StepsIndicators from '../../Components/StepsIndicators';

const routeConfigs = {
  step0: {
    screen: InformationStep,
    params: {
      title: 'Information' // no need for params reomve
    }
  },
  step1: {
    screen: NotificationsStep,
    params: {
      title: 'Notification'
    }
  },
  step2: { screen: CalendarStep,
    params: {
      title: 'Schedule Boundaries'
    }
  },
  step3: { screen: ScheduleSettings,
    params: {
      title: 'Schedule Settings'
    }
  }
};

const navigationConfigs = {
  navigationOptions: {
    header: props => (<View><NavHeader navigation={props.navigation} title={props.navigation.state.params.title}/>
      <StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={props.navigation.state.index}/>
    </View>),
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  },
  initialRouteName: 'step0',
  cardStyle: navStyles.card
};

export const StepFormNavigator = StackNavigator(routeConfigs, navigationConfigs);

class NewDrivingSchoolWizardForm extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.screensInfo = {
      step0: {
        formID: 'newDrivingSchool',
        submitAction: (values, formId, redirect) => {
          if(this.props.drivingSchool) {
            return drivingSchoolActionCreators.updateDrivingSchoolRequest(values, formId, redirect)
          } else {
            return drivingSchoolActionCreators.createDrivingSchoolRequest(values, formId, redirect)
          }
        },
        ref: null
      },
      step1: {
        formID: 'notificationSettings',
        submitAction: (values, formId, redirect) => (drivingSchoolActionCreators.updateEmployeeNotificationsRequest(values, formId, redirect)),
        ref: null
      },
      step2: {
        formID: 'scheduleBoundaries',
        submitAction: (values, formId, redirect) => (drivingSchoolActionCreators.updateScheduleBoundariesRequest(values, formId, redirect)),
        ref: null
      },
      step3: {
        formID: 'scheduleSettings',
        submitAction: (values, formId, redirect) => (drivingSchoolActionCreators.updateScheduleSettingsRequest(values, formId, redirect)),
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
      nextRoute = currentRouteName === 'step3' ? 'main' : `step${nextRouteIndex}`,
      redirectAction = NavigationActions.navigate({ routeName: nextRoute});

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

NewDrivingSchoolWizardForm.router = StepFormNavigator.router;

const mapStateToProps = state => ({form: state.form, drivingSchool: state.context.currentDrivingSchoolID});

export default connect(mapStateToProps, null)(NewDrivingSchoolWizardForm);
