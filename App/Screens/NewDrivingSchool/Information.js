import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FieldArray, Field, reduxForm, reset, SubmissionError } from 'redux-form';
import Icon from 'react-native-vector-icons/Ionicons'

import InputField from '../../Components/InputField';
import ButtonText from '../../Components/ButtonText';
import { Fonts, Colors } from '../../Themes/index';
import { required, minLength, email } from '../../Lib/validators';
import PlacesAutocomplete from '../../Components/PlacesAutocomplete';
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';
import { NavigationActions } from 'react-navigation';
import API from '../../Services/Api';

const api = API.create();

const renderPhoneNumber = (member, index, fields) => (
  <View style={styles.removableInputRow} key={index}>
    <Field component={InputField} name={`phone-${index}`} label={`Phone - ${index + 1}`} required={index === 0}
           key={index}/>
    {index > 0 && <TouchableOpacity onPress={() => {
      fields.remove(index)
    }}><Icon name="md-close" color={Colors.salmon} size={20}/></TouchableOpacity>}
  </View>
);

const renderPhoneNumbersCollection = ({ fields, meta: { error } }) => {
  return (
    <View>
      {fields.map(renderPhoneNumber)}
      <ButtonText onPress={() => (fields.push({}))} position={'flex-end'}>Add phone number +</ButtonText>
    </View>
  );
};


const renderEmail = (member, index, fields) => (
  <View style={styles.removableInputRow} key={index}>
    <Field component={InputField} name={`email-${index}`} label={`Email - ${index + 1}`} required={index === 0}/>
    {index > 0 && <TouchableOpacity onPress={() => {
      fields.remove(index)
    }}><Icon name="md-close" color={Colors.salmon} size={20}/></TouchableOpacity>}
  </View>
);


const renderEmailsCollection = ({ fields, meta: { error } }) => {
  return (
    <View>
      {fields.map(renderEmail)}
      <ButtonText onPress={() => (fields.push({}))} position={'flex-end'}>Add Email +</ButtonText>
    </View>
  );
};

const styles = StyleSheet.create({
  removableInputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

class InformationStep extends Component {
  static navigationOptions = {
    header: props => <View><NavHeader navigation={props.screenProps.parentNav} title={'Information'}/><StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={0}/></View>,
    headerStyle: { elevation: 0, shadowOpacity: 0, }
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  submitForm() {
    console.log(`Submitting ${this.props.navigation.state.routeName}..`);
  }

  submitForm2 = () => {
    this.props.handleSubmit(values => {
      return api.createDrivingSchool(values)
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
                navigation.dispatch(goToLogin);
                navigation.dispatch(reset('signUp'));
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
        });
    });
  };

  render() {
    const { change } = this.props;
    // TODO add ActivityIndicator spinner form react-native module
    return (
      <Layout customStyles={{paddingTop: 0}}>
        <Field name={'name'} component={InputField} label={'Nazwa'} required={true} validate={required}/>
        {/*TODO bind address raletd data like address lat lng to redux store*/}
        <Field name={'address'} component={PlacesAutocomplete} label={'Adres'} required={true} setValue={change} validate={required}/>
        <FieldArray name={"phone_numbers"} component={renderPhoneNumbersCollection}/>
        <FieldArray name={"emails"} component={renderEmailsCollection}/>
        <Field name={'website'} component={InputField} label={'Witryna Internetowa'}/>
        {/*TODO add multiline true and prevent keyboard overlapping the input field*/}
        <Field name={'additional_info'} component={InputField} label={'Dodadkowe informacje'}/>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'newDrivingSchool',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    name: 'Agra',
    address: 'Pokatna 99',
    phone_numbers: ['99999999', '888888888'],
    emails: ['a@a.a', 'b@b.b'],
    website: 'www.google.com',
    additional_info: 'Loremipsum dolor sit melt'
  }
})(InformationStep);
