/** Built-in modules */
import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Field, reduxForm, FormSection } from 'redux-form';
import { invite } from '../../../Redux/Views/InvitationsRedux';
/** Custom components */
import CellSwitch from '../../../Components/CellWithSwitch';
import Layout from '../../../Components/Layout';
import FormErrorMessage from '../../../Components/GenerealFormErrorMessage';

class PrivilegesStep extends Component {
  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  submitForm = () => {
    this.props.handleSubmit(invite)();
  };

  render() {
    const { change, error } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <FormSection name={'employee_privileges'}>
          <ScrollView>
            <Field name={'can_manage_employees'} component={CellSwitch}
                   label={'Zarzadzanie pracownikami'}
                   description={'Zaproszony uzytkownik bedzie mogl dodawac, usuwac pracownikow ze szkoly oraz nadawac im przywileje.'}
                   onChangeHandler={value => change(
                     'employee_privileges.can_manage_employees', value)}
            />
            <Field name={'can_manage_students'} component={CellSwitch}
                   label={'Zarzadzanie kursantami'}
                   description={'Zaproszony uzytkownik bedzie mogl dodawac, usuwac, archwiizowac kursanow oraz nadawać im dostepne lekcje..'}
                   onChangeHandler={value => change(
                     'employee_privileges.can_manage_students', value)}
            />
            <Field name={'can_modify_schedules'} component={CellSwitch}
                   label={'Pozwalaj na ustalanie grafiku'}
                   description={'Zaproszony uzytkownik bedzie mogl ustawiac grafik.'}
                   onChangeHandler={value => change(
                     'employee_privileges.can_modify_schedules', value)}
            />
            <Field name={'is_driving'} component={CellSwitch}
                   label={'Jest instruktorem'}
                   description={'Lorem ipsum dolor sit melt'}
                   onChangeHandler={value => change(
                     'employee_privileges.is_driving', value)}
            />
          </ScrollView>
        </FormSection>
      </Layout>
    );
  }
}

export default reduxForm({
  form: 'Employees',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmitSuccess: (result, dispatch, props) => {
    const title = 'Congratulations!';
    const message = 'Your Invitation has been sent to given email address.';

    const buttons = [
      {
        text: 'OK', onPress: () => {
          props.screenProps.takeMeBack();
        },
      }];

    Alert.alert(title, message, buttons);
  },
})(PrivilegesStep);
