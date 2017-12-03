import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FieldArray, Field, reduxForm } from 'redux-form';
import InputField from '../Components/InputField';
import ButtonPrimary from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import CellSwitch from '../Components/CellWithSwitch';
import ButtonText from '../Components/ButtonText';
import Icon from 'react-native-vector-icons/Ionicons'
import { Fonts, Colors } from '../Themes/';
import StepsIndicators from '../Components/StepsIndicators';
import { required, isAccepted, minLength, passwordsMatch, email } from '../Lib/validators';
import PlacesAutocomplete from '../Components/PlacesAutocomplete';

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

class DrivingSchoolRegistrationScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    }
  }

  render() {
    const { change } = this.props;

    return (
      <Layout>
        {/*<StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={this.state.currentStep}/>*/}

        <Field name={'name'} component={InputField} label={'Nazwa'} required={true} validate={required}/>
        <Field name={'address'} component={PlacesAutocomplete} label={'Adres'} required={true} setValue={val=>change('address', val)} validate={required}/>
        {/*<FieldArray name={"phone_numbers"} component={renderPhoneNumbersCollection}/>*/}
        {/*<FieldArray name={"emails"} component={renderEmailsCollection}/>*/}
        {/*<Field name={'website'} component={InputField} label={'Witryna Internetowa'}/>*/}
        {/*<Field name={'additional_info'} component={InputField} label={'Dodadkowe informacje'}/>*/}
        {/*<Field name={"address"} component={InputField} label={'Dodadkowe informacje'}/>*/}

        {/*<CellSwitch label={'Otrzymuj powiadomienia push'}*/}
        {/*description={'Bedziesz otrzymywał co jakiś czas powiadomienia nawet jesli Twoja aplikacja będzie zamknięta.'}*/}
        {/*value={true}/>*/}
        {/*<CellSwitch label={'Otrzymuj raporty tygodniowe'}*/}
        {/*description={'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.'}/>*/}
        {/*<CellSwitch label={'Otrzymuj raporty miesieczne'}*/}
        {/*description={'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.'} value={true}/>*/}
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'newDrivingSchool',
  initialValues: {
    emails: [{}],
    phone_numbers: [{}]
  }
})(DrivingSchoolRegistrationScreen);
