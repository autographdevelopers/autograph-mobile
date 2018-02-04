import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, destroy } from 'redux-form';
import { NavigationActions } from 'react-navigation';

import {
  required,
  isAccepted,
  minLength,
  passwordsMatch,
  email,
} from '../Lib/validators';
import RadioButtonsCollection from '../Components/RadioBoxPairInputField';
import PrimaryButton from '../Components/ButtonPrimary';
import AcceptTerms from '../Components/AcceptTerms';
import DateSelector from '../Components/DateSelector';
import InputField from '../Components/InputField';
import NavHeader from '../Components/NavHeader';
import Layout from '../Components/Layout';
import { API as api } from '../Services/Api';

const submit = navigation => values => {
  return api.signUp(values).then(response => {
    if ( response.ok ) {
      const title = 'Congratulations!';
      const message = 'Your registration completed successfully. Please confirm your email in order to login to application.';
      const goToLogin = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'launchScreen' }),
          NavigationActions.navigate({ routeName: 'login' }),
        ],
      });
      const buttons = [
        {
          text: 'OK', onPress: () => {
            navigation.dispatch(goToLogin);
            navigation.dispatch(destroy('signUp'));
          },
        }];
      Alert.alert(title, message, buttons);
    } else {
      console.log(response);
      const errors = {};
      Object.keys(response.data).forEach(field => {
        errors[field] = { all: response.data[field] };
      });
      throw new SubmissionError(errors);
    }
  });
};

class SignUpScreen extends Component {
  static navigationOptions = {
    header: props => <NavHeader navigation={props.navigation}
                                title={'Załóż konto'}/>,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const typeData = [
      { boundValue: 'Employee', label: 'Pracownik' },
      { boundValue: 'Student', label: 'Kursant' },
    ];

    const genderData = [
      { boundValue: 'male', label: 'Mezczyzna' },
      { boundValue: 'female', label: 'Kobieta' },
    ];

    const { handleSubmit, change, submitting, navigation } = this.props;

    return (
      <Layout>
        <Field name={'type'} data={typeData}
               setValue={val => () => this.props.change('type', val)}
               component={RadioButtonsCollection} label={'Kim jestes?'}
               asterix={true} validate={required}/>

        <Field name={'email'} component={InputField}
               label={'Email'}
               asterix={true} validate={[required, email]}
               options={{autoCapitalize: 'none'}} />

        <Field name={'name'} component={InputField} label={'Imię'}
               asterix={true} validate={required}/>

        <Field name={'surname'} component={InputField} label={'Nazwisko'}
               asterix={true} validate={required}/>

        <Field name={'password'} component={InputField} label={'Haslo'}
               required={true}
               options={{ secureTextEntry: true }}
               validate={[required, minLength(8)]}/>

        <Field name={'password_confirmation'} component={InputField}
               label={'Potwierdź haslo'} required={true}
               options={{ secureTextEntry: true }}
               validate={[required, passwordsMatch]}/>

        <Field name={'gender'} data={genderData}
               setValue={val => () => change('gender', val)}
               component={RadioButtonsCollection} label={'Plec'}
               asterix={true} validate={required}/>

        <Field name={'birth_date'} setValue={val => change('birth_date', val)}
               maxDate={new Date()}
               component={DateSelector} inputLabel={'Data urodzenia'}
               asterix={true} validate={required}/>

        <Field name={'time_zone'} component={InputField}
               label={'Strefa czasowa'} asterix={true} validate={required}/>

        <Field name={'accepted'} component={AcceptTerms} label={''}
               text={'Zgadzam się na zasady i warunki serwisu AutoGraph.'}
               setValue={value => () => change('accepted', value)}
               validate={isAccepted('Musisz zaakceptowac regulamin.')}/>

        <PrimaryButton onPress={handleSubmit(submit(navigation))}
                       submitting={submitting}>Zarejestruj</PrimaryButton>
      </Layout>
    );
  }
}

export default reduxForm({
  form: 'signUp',
  destroyOnUnmount: false,
  initialValues: { accepted: false, time_zone: 'UTC +01:00' },
})(SignUpScreen);

