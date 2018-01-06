/** Built-in modules */
import { NavigationActions, StackNavigator } from 'react-navigation';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import { connect, destroy } from 'react-redux';
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
/** Custom components */
import ButtonPrimary from '../../Components/ButtonPrimary';
import DataScreen from './Data';
import PrivilegesScreen from './Privileges';

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
        ref: null
      },
      step1: {
        ref: null
      }
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  bindScreenRef = (key, ref) => this.screensInfo[key].ref = ref;

  takeMeBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: this.props.navigation.state.key }));
    this.props.destroyForm();
  };

  handleStepSubmission = () => {
    const { navigation } = this.props,
      { index, routes } = navigation.state,
      currentRouteName = routes[index].routeName;

    const { ref } = this.screensInfo[currentRouteName];

    ref.submitForm();
  };

  isSubmitting = () => {
    const { form } = this.props;

    return form && form.submitting
  };

  render() {

    return (
      <View style={{ flex: 1 }}>
        <WizardFormNav navigation={this.props.navigation} screenProps={{ bindScreenRef: this.bindScreenRef, takeMeBack: this.takeMeBack }}/>
        <ButtonPrimary onPress={this.handleStepSubmission} submitting={this.isSubmitting()}>Dalej</ButtonPrimary>
      </View>
    )
  }
}

InviteEmployeeWizardForm.router = WizardFormNav.router;

const mapStateToProps = state => ({
  form: state.form['InviteEmployee'],
});

const mapDispatchToProps = dispatch => ({
  destroyForm: () => dispatch(destroy('InviteEmployee'))
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteEmployeeWizardForm);
