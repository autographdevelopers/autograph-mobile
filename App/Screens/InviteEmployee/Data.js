import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../Components/InputField';
import { email, required } from '../../Lib/validators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';

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

  submitForm = () => {
    this.props.handleSubmit( values => {
      this.props.navigation.navigate('step1');
    })();
  };

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
  initialValues: {
    name: 'dsas',surnname: 'dsadsa', email: 'dsadsa@dsdsa.dsadsa'
  }
})(DataScreen);
