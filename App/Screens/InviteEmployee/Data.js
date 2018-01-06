/** Built-in modules */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm, FormSection } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
/** Custom components */
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';
import InputField from '../../Components/InputField';
import Layout from '../../Components/Layout';
/** Utilities */
import { email, required } from '../../Lib/validators';

class DataScreen extends Component {
  static navigationOptions = {
    header: props => {
      return (<View><NavHeader navigation={props.navigation} title={'Informacje'}/><StepsIndicators
        labels={['Informacje', 'Uprawnienia']} activeIndex={0}/></View>)
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  };

  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  submitForm = () => {
    const {valid, touch, navigation} = this.props;

    valid ? navigation.navigate('step1') : touch('user.name', 'user.surname', 'user.email');
  };

  render() {
    const { error } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <FormSection name={'user'}>
          <KeyboardAwareScrollView>
            <Field name={'name'} component={InputField} label={'Imie'} asterix={true} validate={required}/>
            <Field name={'surname'} component={InputField} label={'Nazwisko'} asterix={true} validate={required}/>
            <Field name={'email'} component={InputField} label={'Email'} asterix={true} validate={[required, email]}/>
          </KeyboardAwareScrollView>
        </FormSection>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'InviteEmployee',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    user: {
      name: '', surname: '', email: '', type: 'Employee'
    },
    employee_privilege_set: {
      can_manage_employees: true,
      can_manage_students: true,
      can_modify_schedules: false,
      is_driving: false
    }
  }
})(DataScreen);
