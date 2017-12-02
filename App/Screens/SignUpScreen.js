import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import InputField from '../Components/InputField';
import { StyleSheet } from 'react-native';
import PrimaryButton from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import DateSelector from '../Components/DateSelector';
import RadioButtonsCollection from '../Components/RadioBoxPairInputField';
import { required, acceptTerms, passwordsMatch, email } from '../Lib/validators';
import AcceptTerms from '../Components/AcceptTerms';
import API from '../Services/Api';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  }
});

const api = API.create();

const submit = navigation => values => {
  return api.signUp(values)
    .then(response => {
      if (response.ok) {
        const title = 'Congratulations!';
        const message = 'Your registration completed successfully. Please confirm your email in order to login to application.';
        const goToLogin = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'launchScreen' }),
            NavigationActions.navigate({ routeName: 'login' })
          ]
        });
        const buttons = [{
          text: 'OK', onPress: () => {
            navigation.dispatch(goToLogin)
          }
        }];
        Alert.alert(title, message, buttons);
      } else {
        const errors = {};
        Object.keys(response.data).forEach(field => {
          errors[field] = { all: response.data[field] }
        });
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

    const { handleSubmit, change, submitting, navigation } = this.props;

    return (
      <Layout>

        <Field name={'type'} data={typeData} setValue={val => () => this.props.change('type', val)}
               component={RadioButtonsCollection} inputLabel={'Who are you?'} required={true} validate={required}/>

        <Field name={'email'} component={InputField} label={'Email'} required={true} validate={email}/>

        <Field name={'name'} component={InputField} label={'Imię'} required={true}/>

        <Field name={'surname'} component={InputField} label={'Nazwisko'} required={true}/>

        <Field name={'password'} component={InputField} label={'Haslo'} required={true}
               options={{ secureTextEntry: true }}/>

        <Field name={'passwordConfirmation'} component={InputField} label={'Potwierdź haslo '} required={true}
               options={{ secureTextEntry: true }}/>

        <Field name={'gender'} data={genderData} setValue={val => () => change('gender', val)}
               component={RadioButtonsCollection} inputLabel={'Gender'} required={true} validate={required}/>

        <Field name={'birth_date'} setValue={val => change('birth_date', val)}
               component={DateSelector} inputLabel={'Date of birth'} required={true} validate={required}/>

        <Field name={'time_zone'} component={InputField} label={'Time Zone'} required={true} validate={required}/>

        <Field name={'accepted'} component={AcceptTerms} label={''} validate={acceptTerms}
               text={'Zgadzam się na zasady i warunki serwisu AutoGraph.'}
               setValue={value => () => change('accepted', value)}/>

        <View style={styles.btnWrapper}>
          <PrimaryButton
            onPress={handleSubmit(submit(navigation))}>{submitting ? 'Wysylanie..' : 'Zarejestruj'}</PrimaryButton>
        </View>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'signUp',
  destroyOnUnmount: false,
  initialValues: {
    accepted: true,
    time_zone: 'UTC+01:00',
    type: 'Student',
    name: '',
    surname: '',
    password: 'a',
    passwordConfirmation: '',
    gender: 'male',
    birth_date: new Date()
  }
})(SignUpScreen);
