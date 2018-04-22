import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FieldArray, Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { required, email, optional, address, digitsOnly } from '../../Lib/validators';
import { Colors } from '../../Themes/index';
import LoadingHOC from '../../HOC/LoadingHOC';
import ButtonPrimary from '../../Components/ButtonPrimary';

import PlacesAutocomplete from '../../Components/PlacesAutocomplete';
import InputField from '../../Components/InputField';
import ButtonText from '../../Components/ButtonText';
import Layout from '../../Components/Layout';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';
import FORM_IDS from './Constants';

import { createDrivingSchool } from '../../Redux/DrivingSchoolRedux';
import { updateDrivingSchool } from '../../Redux/DrivingSchoolRedux';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';

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

const FORM_ID = FORM_IDS.BASIC_INFO;

const styles = StyleSheet.create({
  removableInputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

class InformationStep extends Component {
  constructor(props) {
    super(props);

    if (this.props.screenProps && this.props.screenProps.bindScreenRef) {
      const key = this.props.navigation.state.routeName;
      this.props.screenProps.bindScreenRef(key, this);
    }

    this.state = {
      listViewDisplayed: false
    }
  }

  closeListView = () => {
    this.setState({
      listViewDisplayed: false
    });
  };

  openListView = () => {
    this.setState({
      listViewDisplayed: true
    });
  };

  submitForm = () => {
    const { drivingSchool, handleSubmit } = this.props;
    const action = drivingSchool ? updateDrivingSchool : createDrivingSchool;

    handleSubmit(action)();
  };

  componentWillUnmount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.handleSubmitSuccess) {
      this.props.destroy();
    }
  }

  render() {
    const { change, error, navigation, submitting } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <KeyboardAwareScrollView>
          <Field name={'name'} component={InputField} label={'Nazwa'} asterix={true} validate={required}/>
          <Field name={'street'} component={PlacesAutocomplete} label={'Adres'} asterix={true} setValue={change}
                 validate={[required, address]} openListView={this.openListView} closeListView={this.closeListView}
                 listViewDisplayed={this.state.listViewDisplayed}/>
          <FieldArray name={"phone_numbers"} component={renderPhoneNumbersCollection}/>
          <FieldArray name={"emails"} component={renderEmailsCollection}/>
          <Field name={'website'} component={InputField} label={'Witryna Internetowa'}/>
          <Field name={'additional_info'} component={InputField} label={'Dodadkowe informacje'}
                 options={{ multiline: true }}/>
        </KeyboardAwareScrollView>
        {navigation.state.params && navigation.state.params.singleton &&
          <ButtonPrimary submitting={submitting} onPress={this.submitForm}>Zapisz</ButtonPrimary>}
      </Layout>
    )
  }
}


InformationStep = reduxForm({
  form: FORM_ID,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    phone_numbers: [undefined],
    emails: [undefined]
  },
  onSubmitSuccess: (result, dispatch, props) => {
    const { navigation } = props;

    /** when there is no params passed, params key is undefined thus undefined.handleSubmitSuccess raises na error*/
    try {
      navigation.state.params.handleSubmitSuccess();
    } catch (error) {
      /** default case */
      navigation.navigate('step1');
    }
  }
})(InformationStep);

InformationStep = LoadingHOC(InformationStep);

const mapStateToProps = state => ({
  drivingSchool: state.context.currentDrivingSchoolID,
  initialValues: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  status: state.drivingSchools.status
});


const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(drivingSchoolActionCreators.showRequest())
});


export default connect(mapStateToProps, mapDispatchToProps)(InformationStep);
