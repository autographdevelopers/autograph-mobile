import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FieldArray, Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/Ionicons'

import { required, email, optional, address, digitsOnly } from '../../Lib/validators';
import { Colors } from '../../Themes/index';

import PlacesAutocomplete from '../../Components/PlacesAutocomplete';
import NavHeader from '../../Components/NavHeader';
import InputField from '../../Components/InputField';
import StepsIndicators from '../../Components/StepsIndicators';
import ButtonText from '../../Components/ButtonText';
import Layout from '../../Components/Layout';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';

const renderPhoneNumber = (member, index, fields) => {
  const validateFirstInstancePresent = index === 0 ? required : optional;
  return (<View style={styles.removableInputRow} key={index}>
      <Field component={InputField}
             name={member}
             label={`Phone - ${index + 1}`}
             asterix={index === 0}
             validate={[validateFirstInstancePresent, digitsOnly]}
      />
      {index > 0 && <TouchableOpacity onPress={() => {
        fields.remove(index)
      }}>
        <Icon name="md-close" color={Colors.salmon} size={20}/></TouchableOpacity>}
    </View>
  )
};

const renderEmail = (member, index, fields) => {
  const validateFirstInstancePresent = index === 0 ? required : optional;
  return (<View style={styles.removableInputRow} key={index}>
      <Field component={InputField}
             name={member}
             label={`Email - ${index + 1}`}
             asterix={index === 0}
             validate={[email, validateFirstInstancePresent]}
      />
      {index > 0 && <TouchableOpacity onPress={() => {
        fields.remove(index)
      }}>
        <Icon name="md-close" color={Colors.salmon} size={20}/></TouchableOpacity>}
    </View>
  )
};


const renderPhoneNumbersCollection = ({ fields, meta: { error } }) => {
  return (
    <View>
      {fields.map(renderPhoneNumber)}
      <ButtonText onPress={() => (fields.push())} position={'flex-end'}>Add phone number +</ButtonText>
    </View>
  );
};

const renderEmailsCollection = ({ fields, meta: { error } }) => {
  return (
    <View>
      {fields.map(renderEmail)}
      <ButtonText onPress={() => (fields.push())} position={'flex-end'}>Add Email +</ButtonText>
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
    header: props => {
      return (<View><NavHeader navigation={props.navigation} title={'Information'}/><StepsIndicators
        labels={['Informacje', 'Powiadomienia', 'Kalendarz', 'Ustawienia']} activeIndex={0}/></View>)
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  };

  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  render() {
    const { change, error } = this.props;
    // TODO: add general error info above all forms add Layout to import
    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <KeyboardAwareScrollView>
          <Field name={'name'} component={InputField} label={'Nazwa'} asterix={true} validate={required}/>
          <Field name={'street'} component={PlacesAutocomplete} label={'Adres'} asterix={true} setValue={change}
                 validate={[required, address]}/>
          <FieldArray name={"phone_numbers"} component={renderPhoneNumbersCollection}/>
          <FieldArray name={"emails"} component={renderEmailsCollection}/>
          <Field name={'website'} component={InputField} label={'Witryna Internetowa'}/>
          <Field name={'additional_info'} component={InputField} label={'Dodadkowe informacje'}
                 options={{ multiline: true }}/>
        </KeyboardAwareScrollView>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'basicInformation',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    phone_numbers: [undefined],
    emails: [undefined]
  }
})(InformationStep);
