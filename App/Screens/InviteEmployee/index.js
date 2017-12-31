import { NavigationActions, StackNavigator } from 'react-navigation';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import DataScreen from './Data';
import PrivilegesScreen from './Privileges';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { invitationActionCreators } from '../../Redux/InvitationsRedux';
import { STATUS as INVITATION_STATUS } from '../../Redux/InvitationsRedux';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { destroy } from 'redux-form';

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

  componentWillMount() {
    this.props.setInvitationStatus(INVITATION_STATUS.READY)
  }

  bindScreenRef = (key, ref) => this.screensInfo[key].ref = ref;

  handleStepSubmission = () => {
    const { navigation } = this.props,
      { index, routes } = navigation.state,
      currentRouteName = routes[index].routeName;

    const { ref } = this.screensInfo[currentRouteName];

    ref.submitForm();
  };

  isSubmitting = () => {
    return this.props.form['InviteEmployee'] && this.props.form['InviteEmployee'].submitting
  };

  renderSuccessDialog = () => {
    if(this.props.status === INVITATION_STATUS.SUCCESS) {

      const title = 'Congratulations!';
      const message = 'Your Invitation has been sent to given email address.';

      const buttons = [{
        text: 'OK', onPress: () => {
          this.props.navigation.dispatch(NavigationActions.back({ key: this.props.navigation.state.key }));
          this.props.setInvitationStatus(INVITATION_STATUS.READY);
          this.props.destroyForm();
        }
      }];

      Alert.alert(title, message, buttons);
    }
  };

  render() {
    this.renderSuccessDialog();
    return (
      <View style={{ flex: 1 }}>

        <WizardFormNav navigation={this.props.navigation} screenProps={{ bindScreenRef: this.bindScreenRef }}/>

        <ButtonPrimary onPress={this.handleStepSubmission} submitting={this.isSubmitting()}>Dalej</ButtonPrimary>
      </View>
    )
  }
}

InviteEmployeeWizardForm.router = WizardFormNav.router;

const mapStateToProps = state => ({
  form: state.form,
  status: state.invitations.status
});
const mapDispatchToProps = dispatch => ({
  setInvitationStatus: status => dispatch(invitationActionCreators.changeInvitationStatus(status)),
  destroyForm: () => dispatch(destroy('InviteEmployee'))
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteEmployeeWizardForm);
