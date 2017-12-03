import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { FieldArray, Field, reduxForm } from 'redux-form';
import InputField from '../Components/InputField';
import ButtonPrimary from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import CellSwitch from '../Components/CellWithSwitch';

const renderPhoneNumber = (member, index, fields) => (
  <Field component={InputField} name={`phone-${index}`} label={`Phone - ${index + 1}`} required={index===0} key={index}/>
);

const renderPhoneNumbers = ({ fields, meta: { error } }) => {
  return (
    <View>
      <ButtonPrimary onPress={() => (fields.push({}))}>Add phone number</ButtonPrimary>
      {fields.map(renderPhoneNumber)}
    </View>
  );
};


const renderEmail = (member, index, fields) => (
  <Field component={InputField} name={`email-${index}`} label={`Email - ${index + 1}`} required={index===0} key={index}/>
);


const renderEmails = ({ fields, meta: { error } }) => {
  return (
    <View>
      <ButtonPrimary onPress={() => (fields.push({}))}>Add Email</ButtonPrimary>
      {fields.map(renderEmail)}
    </View>
  );
};

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
          <CellSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'} value={true}/>
          <CellSwitch label={'Some laSome labelSome labelSome labelSome labelSome labelSome labelbel'} description={'Lorem ipsum dolor sit melt some very interesing '}/>
          <CellSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt'} value={true}/>
          <CellSwitch label={'Some label'} />
          <CellSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fLorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'}/>
          <CellSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'} value={true}/>
        </View>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'newDrivingSchool'
})(DrivingSchoolRegistrationScreen);
