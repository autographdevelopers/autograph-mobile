import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FieldArray, Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/Ionicons';
import PlacesAutocomplete from '../../Components/PlacesAutocomplete';
import InputField from '../../Components/InputField';
import { address, email, required } from '../../Lib/validators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavHeader from '../../Components/NavHeader';

class DataScreen extends Component {
  static navigationOptions = {
    header: props => {
      return (<View><NavHeader navigation={props.navigation} title={'Information'}/><StepsIndicators labels={['Informacje', 'Uprawnienia']} activeIndex={0}/></View>)
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  };

  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  render() {
    return (
      <Layout customStyles={{ paddingTop: 0 }}>
        <KeyboardAwareScrollView>
          <Field name={'name'} component={InputField} label={'Nazwa'} asterix={true} validate={required}/>
          <Field name={'surnname'} component={InputField} label={'Nazwa'} asterix={true} validate={required}/>
          <Field name={'email'} component={InputField} label={'Email'} asterix={true} validate={[required, email]}/>
        </KeyboardAwareScrollView>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'InviteEmployeePersonalDataStep',
  destroyOnUnmount: false,
  // forceUnregisterOnUnmount: true,
})(DataScreen);
