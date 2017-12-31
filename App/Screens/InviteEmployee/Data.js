import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm, FormSection } from 'redux-form';
import InputField from '../../Components/InputField';
import { email, required } from '../../Lib/validators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';

class DataScreen extends Component {
  static navigationOptions = {
    header: props => {
      return (<View><NavHeader navigation={props.navigation} title={'Information'}/><StepsIndicators
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
    this.props.handleSubmit(_ => {
      this.props.navigation.navigate('step1');
    })();
  };

  render() {
    const { error } = this.props;
    return (
      <Layout customStyles={{ paddingTop: 0 }}>
        <FormErrorMessage>{error}</FormErrorMessage>
        <FormSection name={'user'}>
          <KeyboardAwareScrollView>
            <Field name={'name'} component={InputField} label={'Nazwa'} asterix={true} validate={required}/>
            <Field name={'surnname'} component={InputField} label={'Nazwa'} asterix={true} validate={required}/>
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
      name: 'dsas', surnname: 'dsadsa', email: 'dsadsa@dsdsa.dsadsa', type: 'Employee'
    },
    employee_privilege_set: {
      can_manage_employees: true,
      can_manage_students: true,
      can_modify_schedules: false,
      is_driving: false
    }
  }
})(DataScreen);
