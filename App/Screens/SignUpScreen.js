import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';
import { reduxForm, Field } from 'redux-form';
import InputField from '../Components/InputField';
import CheckBox from '../Components/CheckBox';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import PrimaryButton from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import DateSelector from '../Components/DateSelector';
import RadioButtonsCollection from '../Components/RadioBoxPairInputField';
import { required, acceptTerms } from '../Lib/validators';

const styles = StyleSheet.create({
  acceptTermsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  acceptTermsLabel: {
    fontSize: Fonts.size.small,
    color: Colors.strongGrey,
    marginLeft: 20
  },
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  }
});

class SignUpScreen extends Component {
  static navigationOptions = {
    header: (props) => <NavHeader navigation={props.navigation} title={'Załóż konto'}/>
  };

  constructor(props) {
    super(props);
  }

  render() {
    const typeData = [
      { boundValue: 'employee', label: 'Employee' },
      { boundValue: 'student', label: 'Student' }
    ];

    const genderData = [
      { boundValue: 'male', label: 'Male' },
      { boundValue: 'female', label: 'Female' }
    ];

    return (
      <Layout>

        <Field name={'type'} data={typeData} setValue={ val => () => this.props.change('type', val)}
               component={RadioButtonsCollection} inputLabel={'Who are you?'} required={true} validate={required} />

        <Field name={'email'} component={InputField} label={'Email'} required={true} validate={required} />

        <Field name={'name'} component={InputField} label={'Imię'} required={true} validate={required} />

        <Field name={'surname'} component={InputField} label={'Nazwisko'} required={true} validate={required} />

        <Field name={'password'} component={InputField} label={'Haslo'} required={true}
               options={{ secureTextEntry: true }} validate={required} />

        <Field name={'passwordConfirmation'} component={InputField} label={'Potwierdź haslo '} required={true}
               options={{ secureTextEntry: true }} validate={required} />

        <Field name={'gender'} data={genderData} setValue={ val => () => this.props.change('gender', val)}
               component={RadioButtonsCollection} inputLabel={'Gender'} required={true} validate={required} />

        <Field name={'birth_day'} setValue={ val => this.props.change('birth_day', val)}
               component={DateSelector} inputLabel={'Date of birth'} required={true} validate={required} />

        <View style={styles.acceptTermsRow}>
          <Field name={'accepted'} setValue={ value => () => this.props.change('accepted', value)}
                 component={CheckBox} validate={acceptTerms} />
          <Text style={styles.acceptTermsLabel}>Zgadzam się na zasady i warunki serwisu AutoGraph.</Text>
        </View>

        <View style={styles.btnWrapper}>
          <PrimaryButton>Zarejestruj</PrimaryButton>
        </View>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'signUp',
  initialValues: { accepted: false, type: 'employee', gender: 'male' }
})(SignUpScreen);
