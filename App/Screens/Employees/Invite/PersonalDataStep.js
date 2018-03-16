/** Built-in modules */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm, FormSection } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
/** Custom components */
import FormErrorMessage from '../../../Components/GenerealFormErrorMessage';
import InputField from '../../../Components/InputField';
import Layout from '../../../Components/Layout';
/** Utilities */
import { email, required } from '../../../Lib/validators';

class PersonalDataStep extends Component {
  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  submitForm = () => {
    const { valid, touch, navigation } = this.props;

    if(valid) {
      navigation.navigate('step1')
    } else {
      touch('user.name', 'user.surname', 'user.email');
    }
  };

  render() {
    const { error } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <FormSection name={'user'}>
          <KeyboardAwareScrollView>
            <Field name={'name'} component={InputField} label={'Imie'}
                   asterix={true} validate={required}/>
            <Field name={'surname'} component={InputField} label={'Nazwisko'}
                   asterix={true} validate={required}/>
            <Field name={'email'} component={InputField} label={'Email'}
                   asterix={true} validate={[required, email]} options={{autoCapitalize: 'none'}}/>
          </KeyboardAwareScrollView>
        </FormSection>
      </Layout>
    );
  }
}

export default reduxForm({
  form: 'Employees',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    user: {
      type: 'Employee'
    },
    employee_privileges: {
      can_manage_employees: true,
      can_manage_students: true,
      can_modify_schedules: false,
      is_driving: false,
    },
  },
})(PersonalDataStep);
