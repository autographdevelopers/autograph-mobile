/** Built-in modules */
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Field, reduxForm, FormSection } from 'redux-form';
import { Alert, ScrollView, View } from 'react-native';
import React, { Component } from 'react';
/** Custom components */
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';
import InputField from '../../Components/InputField';
import NavHeader from '../../Components/NavHeader';
import ButtonPrimary from '../../Components/ButtonPrimary';
import Layout from '../../Components/Layout'
/** Utilities */
import { invite } from '../../Redux/InvitationsRedux';
import { email, required } from '../../Lib/validators';

class InviteStudent extends Component {
  static navigationOptions = {
    header: props => <NavHeader navigation={props.navigation} title={'Informacje'} />,
  };

  submitForm = () => {
    this.props.handleSubmit(invite)();
  };

  render() {
    const { error, submitting } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Layout>
          <FormErrorMessage>{error}</FormErrorMessage>
          <FormSection name={'user'}>
            <KeyboardAwareScrollView>
              <Field name={'name'} component={InputField} label={'Imie'} asterix={true} validate={required}/>
              <Field name={'surname'} component={InputField} label={'Nazwisko'} asterix={true} validate={required}/>
              <Field name={'email'} component={InputField} options={{autoCapitalize: 'none'}}
                     label={'Email'} asterix={true} validate={[required, email]}/>
            </KeyboardAwareScrollView>
          </FormSection>
          <ButtonPrimary onPress={this.submitForm} submitting={submitting}>Zapros!</ButtonPrimary>
        </Layout>
      </View>
    )
  }
}

export default reduxForm({
  form: 'InviteStudent',
  initialValues: {
    user: {
      type: 'Student'
    }
  },
  onSubmitSuccess: (result, dispatch, props) => {
    const title = 'Congratulations!';
    const message = 'Your Invitation has been sent to given email address.';

    const buttons = [{
      text: 'OK', onPress: () => {
        props.navigation.goBack();
      }
    }];

    Alert.alert(title, message, buttons);
  }
})(InviteStudent);

/**
 * TODO:
 *  Order of connection to store through connect and redux form matters. Find out why.
 *  Pull button down, rethink and fix floating mode
 *  Rewrite all forms to use redux form, redux-form-saga and button with spinner mode
 * */

