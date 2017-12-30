import { NavigationActions, StackNavigator } from 'react-navigation';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import DataScreen from './Data';
import PrivilegesScreen from './Privileges';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';

import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import ButtonPrimary from '../../Components/ButtonPrimary';

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
        ref: null
      },
      step1: {
        formID: 'InviteEmployeePrivilegesStep',
        ref: null
      }
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  bindScreenRef = (key, ref) => this.screensInfo[key].ref = ref;

  handleStepSubmission = () => {
    const { navigation } = this.props,
      { index, routes } = navigation.state,
      currentRouteName = routes[index].routeName;

    const {ref} = this.screensInfo[currentRouteName];

    ref.submitForm();
  };

  destroyForm = () => Object.keys(this.screensInfo).forEach(step => this.props.destroyForm(this.screensInfo[step].formID));

  isSubmitting = () => {
    return this.currentForm() && this.currentForm().submitting
  };

  finalSubmitSucceeded = () => {
    const form = this.props.form['InviteEmployeePrivilegesStep'];

    return form && form.submitSucceeded
  };

  currentForm = () => {
    const { index, routes } = this.props.navigation.state,
      currentRouteName = routes[index].routeName,
      { formID } = this.screensInfo[currentRouteName],
      { form } = this.props;

    return form[formID];
  };

  showSuccessDialog = () => {
    if (this.finalSubmitSucceeded()) {
      // this.destroyForm(); // do this in saga
      console.log('final submit succeed');
      const title = 'Congratulations!';
      const message = 'Your Invitation has been sent to given email address.';

      const buttons = [{
        text: 'OK', onPress: () => {
          this.props.navigation.dispatch(NavigationActions.back({ key: this.props.navigation.state.key }));
        }
      }];

      Alert.alert(title, message, buttons);
    }
  };

  render() {
    this.showSuccessDialog();

    return (
      <View style={{ flex: 1 }}>
        <WizardFormNav navigation={this.props.navigation} screenProps={{ bindScreenRef: this.bindScreenRef }}/>

        <ButtonPrimary onPress={this.handleStepSubmission} submitting={this.isSubmitting()}>Dalej</ButtonPrimary>
      </View>
    )
  }
}

InviteEmployeeWizardForm.router = WizardFormNav.router;

const mapStateToProps = state => ({ form: state.form, drivingSchool: state.context.currentDrivingSchoolID });
const mapDispatchToProps = dispatch => ({
  destroyForm: formID => {
    dispatch(destroy(formID))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteEmployeeWizardForm);
