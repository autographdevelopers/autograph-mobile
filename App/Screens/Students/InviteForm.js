import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection } from 'redux-form';
import InputField from '../../Components/InputField';
import { email, required } from '../../Lib/validators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavHeader from '../../Components/NavHeader';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';
import { invitationActionCreators, STATUS as INVITATION_STATUS } from '../../Redux/InvitationsRedux';
import ButtonPrimary from '../../Components/ButtonPrimary';
import Layout from '../../Components/Layout'

class InviteStudent extends Component {
  static navigationOptions = {
    header: props => {
      return <NavHeader navigation={props.navigation} title={'Informacje'}/>
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  };

  constructor(props) {
    super(props);
  }

  submitForm = () => {
    this.props.handleSubmit(values => {
      this.props.dispatch(invitationActionCreators.inviteUserRequest(values, 'InviteStudent'));
    })();
  };

  componentWillMount() {
    this.props.setInvitationStatus(INVITATION_STATUS.READY)
  }

  renderSuccessDialog = () => {
    if (this.props.status === INVITATION_STATUS.SUCCESS && this.props.submitSucceeded) {

      const title = 'Congratulations!';
      const message = 'Your Invitation has been sent to given email address.';

      const buttons = [{
        text: 'OK', onPress: () => {
          this.props.setInvitationStatus(INVITATION_STATUS.READY);
          this.props.navigation.goBack();
        }
      }];

      Alert.alert(title, message, buttons);
    }
  };

  render() {
    this.renderSuccessDialog();
    const { error, submitting } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Layout>
          <FormErrorMessage>{error}</FormErrorMessage>
          <FormSection name={'user'}>
            <KeyboardAwareScrollView>
              <Field name={'name'} component={InputField} label={'Imie'} asterix={true} validate={required}/>
              <Field name={'surname'} component={InputField} label={'Nazwisko'} asterix={true} validate={required}/>
              <Field name={'email'} component={InputField} label={'Email'} asterix={true} validate={[required, email]}/>
            </KeyboardAwareScrollView>
          </FormSection>
          <ButtonPrimary onPress={this.submitForm} submitting={submitting}>Zapros!</ButtonPrimary>
        </Layout>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setInvitationStatus: status => dispatch(invitationActionCreators.changeInvitationStatus(status))
});

const mapStateToProps = state => ({
  form: state.form,
  status: state.invitations.status
});

InviteStudent = connect(mapStateToProps, mapDispatchToProps)(InviteStudent);

export default reduxForm({
  form: 'InviteStudent',
  initialValues: {
    user: {
      name: '', surname: '', email: '', type: 'Student'
    }
  }
})(InviteStudent);

/**
 * TODO:
 *  Order of connection to store through connect and redux form matters. Find out why.
 *  Abstract out lists logic and styles from employees and students module
 *  Pull button down, rethink and fix floating mode
 *  Rewrite all forms to use redux form and button with spinner mode
 *  Why server doesnt accept params when in form i dont provide initialValues?
 *  Why Dialog box sometime renders two times?
 * */
