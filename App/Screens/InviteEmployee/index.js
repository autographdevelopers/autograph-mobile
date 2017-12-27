import { NavigationActions, StackNavigator } from 'react-navigation';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import DataScreen from './Data';
import PrivilegesScreen from './Privileges';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import ButtonPrimary from '../../Components/ButtonPrimary';
import StepsIndicators from '../../Components/StepsIndicators';


const routeConfigs = {
  step0: {
    screen: DataScreen
  },
  step1: {
    screen: PrivilegesScreen
  }
};

const navigationConfigs = {
  navigationOptions: {
    header: null,
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  },
  initialRouteName: 'step0',
  cardStyle: navStyles.card
};

const WizardFormNav = StackNavigator(routeConfigs, navigationConfigs);

class InviteEmployeeWizardForm extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);

    this.screensInfo = {
      step0: {
        formID: 'InviteEmployeePersonalDataStep',
        // submitAction: (...args) => {
        //   const action = drivingSchool ? 'updateDrivingSchoolRequest' : 'createDrivingSchoolRequest';
        //   return drivingSchoolActionCreators[action](...args);
        // },
        ref: null
      },
      step1: {
        formID: 'InviteEmployeePrivilegesStep',
        // submitAction: drivingSchoolActionCreators.updateEmployeeNotificationsRequest,
        ref: null
      }
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  bindScreenRef = (key, ref) => this.screensInfo[key].ref = ref;

  nextStep = () => {
    const { index, routes } = this.props.navigation.state,
      currentRouteName = routes[index].routeName,
      nextRouteIndex = index + 1,
      nextRoute = currentRouteName === 'step3' ? 'main' : `step${nextRouteIndex}`,
      redirectAction = NavigationActions.navigate({ routeName: nextRoute }),
      { ref } = this.screensInfo[currentRouteName],
      // { formID, ref, submitAction } = this.screensInfo[currentRouteName],
      { navigation } = this.props;

    ref.props.handleSubmit(values => navigation.dispatch(redirectAction))();

    if (currentRouteName === 'step1') this.resetForm();
  };

  resetForm = () => Object.keys(this.screensInfo).forEach(step => this.props.resetForm(this.screensInfo[step].formID));

  isSubmitting = () => {
    const { index, routes } = this.props.navigation.state,
      currentRouteName = routes[index].routeName,
      { formID } = this.screensInfo[currentRouteName],
      { form } = this.props;

    return form[formID] && form[formID].submitting
  };

  render() {

    return (
      <View style={{ flex: 1 }}>
        <WizardFormNav navigation={this.props.navigation} screenProps={{ bindScreenRef: this.bindScreenRef }}/>

        <ButtonPrimary onPress={this.nextStep} submitting={this.isSubmitting()}>Dalej</ButtonPrimary>
      </View>
    )
  }
}

InviteEmployeeWizardForm.router = WizardFormNav.router;

const mapStateToProps = state => ({ form: state.form, drivingSchool: state.context.currentDrivingSchoolID });
const mapDispatchToProps = dispatch => ({
  resetForm: formID => {
    dispatch(reset(formID))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteEmployeeWizardForm);
