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

const renderPhoneNumber = (member, index, fields) => (
  <View style={styles.removableInputRow} key={index}>
    <Field component={InputField} name={`phone-${index}`} label={`Phone - ${index + 1}`} required={index === 0}
           key={index}/>
    <TouchableOpacity onPress={() => {
      fields.remove(index)
    }}><Icon name="md-close" color={Colors.salmon} size={20}/></TouchableOpacity>
  </View>
);

const renderPhoneNumbers = ({ fields, meta: { error } }) => {
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
    <TouchableOpacity onPress={() => {
      fields.remove(index)
    }}><Icon name="md-close" color={Colors.salmon} size={20}/></TouchableOpacity>
  </View>
);


const renderEmails = ({ fields, meta: { error } }) => {
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
    super(props)
  }

  render() {
    return (
      <Layout>
        <FieldArray name={"phone_numbers"} component={renderPhoneNumbers}/>
        <FieldArray name={"emails"} component={renderEmails}/>
        <View>
          <CellSwitch label={'Some label'}
                      description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'}
                      value={true}/>
          <CellSwitch label={'Some laSome labelSome labelSome labelSome labelSome labelSome labelbel'}
                      description={'Lorem ipsum dolor sit melt some very interesing '}/>
          <CellSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt'} value={true}/>
          <CellSwitch label={'Some label'}/>
          <CellSwitch label={'Some label'}
                      description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fLorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'}/>
          <CellSwitch label={'Some label'}
                      description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'}
                      value={true}/>
        </View>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'newDrivingSchool'
})(DrivingSchoolRegistrationScreen);
