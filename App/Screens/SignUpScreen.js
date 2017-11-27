import { Text, View } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';
import { reduxForm, Field } from 'redux-form';
import RadioButton from '../Components/RadioButton';
import InputField from '../Components/InputField';
import CheckBox from '../Components/CheckBox';

class SignUpScreen extends Component {
  static navigationOptions = {
    header: (props) => <NavHeader navigation={props.navigation} title={'Załóż konto'}/>
  };

  constructor(props) {
    super(props)
  }

  render() {
    // Testing components in practice when connected to redux-form
    return (
      <View>
        <Field name={'Email'} component={InputField} label={'Email'} required={true}/>
        <Field name={'gender'} boundValue={'male'} setValue={ ()=> this.props.change('gender', 'male') } component={RadioButton} />
        <Field name={'gender'} boundValue={'female'} setValue={ ()=> this.props.change('gender', 'female') } component={RadioButton} />
        <Field name={'accepted'} setValue={ (value)=> () => this.props.change('accepted', value) } component={CheckBox} />
      </View>
    )
  }
}

export default reduxForm({form: 'signUp', initialValues: { accepted: true, gender: 'male' } })(SignUpScreen);
