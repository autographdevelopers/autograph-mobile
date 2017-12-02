import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import InputField from '../Components/InputField';
import { StyleSheet } from 'react-native';
import PrimaryButton from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import DateSelector from '../Components/DateSelector';
import RadioButtonsCollection from '../Components/RadioBoxPairInputField';
import { required, acceptTerms, passwordsMatch } from '../Lib/validators';
import { USER_ACTION_TYPES } from '../Redux/UserRedux';
import { connect } from 'react-redux';
import AcceptTerms from '../Components/AcceptTerms';
import API from '../Services/Api';
import PrimaryNavigation from '../Navigation/AppNavigation';

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  }
});

api = API.create();
const submit = values => {
  return api.signUp(values)
    .then(response => {
      console.tron.log('EMAIL');
      console.tron.log(response.data.email);
      if (response.ok) {

      } else {
        let errors = {};
        Object.keys(response.data).forEach( field => {
          errors[field] = {all: response.data[field]}
        });
        console.tron.log('ERRORS');
        console.tron.log(errors);
        throw new SubmissionError(errors);
      }
    })
};

class SignUpScreen extends Component {
  static navigationOptions = {
    header: (props) => <NavHeader navigation={props.navigation} title={'Załóż konto'}/>
  };

  constructor(props) {
    super(props);
  }

  render() {
    const typeData = [
      { boundValue: 'Employee', label: 'Employee' },
      { boundValue: 'Student', label: 'Student' }
    ];

    const genderData = [
      { boundValue: 'male', label: 'Male' },
      { boundValue: 'female', label: 'Female' }
    ];

    return (
      <Layout>

        <Field name={'type'} data={typeData} setValue={val => () => this.props.change('type', val)}
               component={RadioButtonsCollection} inputLabel={'Who are you?'} required={true} validate={required}/>

        <Field name={'email'} component={InputField} label={'Email'} required={true} validate={required}/>

        <Field name={'name'} component={InputField} label={'Imię'} required={true} validate={required}/>

        <Field name={'surname'} component={InputField} label={'Nazwisko'} required={true} validate={required}/>

        <Field name={'password'} component={InputField} label={'Haslo'} required={true}
               options={{ secureTextEntry: true }} validate={required}/>

        <Field name={'passwordConfirmation'} component={InputField} label={'Potwierdź haslo '} required={true}
               options={{ secureTextEntry: true }} validate={passwordsMatch}/>

        <Field name={'gender'} data={genderData} setValue={val => () => this.props.change('gender', val)}
               component={RadioButtonsCollection} inputLabel={'Gender'} required={true} validate={required}/>

        <Field name={'birth_date'} setValue={val => this.props.change('birth_date', val)}
               component={DateSelector} inputLabel={'Date of birth'} required={true} validate={required}/>

        <Field name={'time_zone'} component={InputField} label={'Time Zone'} required={true} validate={required}/>

        <Field name={'accepted'} component={AcceptTerms} label={''} validate={acceptTerms}
               text={'Zgadzam się na zasady i warunki serwisu AutoGraph.'}
               setValue={value => () => this.props.change('accepted', value)}/>

        <View style={styles.btnWrapper}>
          <PrimaryButton onPress={this.props.handleSubmit(submit)}>Zarejestruj</PrimaryButton>
        </View>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  submit: values => {
    dispatch({ type: USER_ACTION_TYPES.REQUEST_REGISTRATION_PROCEDURE, payload: values })
  }
});

SignUpScreen = connect(null, mapDispatchToProps)(SignUpScreen);

export default reduxForm({
  form: 'signUp',
  destroyOnUnmount: false,
  initialValues: { accepted: false, time_zone: 'UTC+01:00' }
})(SignUpScreen);
