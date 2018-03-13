import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ButtonPrimary from '../../../Components/ButtonPrimary';
import { Colors, Fonts } from '../../../Themes/';
import { connect } from 'react-redux';
import Layout from '../../../Components/Layout';
import ListHeader from '../../../Components/ListHeader';
import { Field, reduxForm } from 'redux-form';
import CellSwitch from '../../../Components/CellWithSwitch';
import {
  employeePrivilegesActionCreators,
  update,
} from '../../../Redux/EmployeePrivileges';
import LoadingHOC from '../../../Containers/LoadingHOC';

class EditPrivileges extends Component {

  submitForm = () => {
    this.props.handleSubmit(update)();
  };

  render() {
    const { change, submitting } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ListHeader title={'Uprawnienia'}/>
        <Layout>
          <Field name={'can_manage_employees'} component={CellSwitch}
                   label={'Zarzadzanie pracownikami'}
                   description={'Zaproszony uzytkownik bedzie mogl dodawac, usuwac pracownikow ze szkoly oraz nadawac im przywileje.'}
                   onChangeHandler={value => change(
                     'can_manage_employees', value)}
                 />
          <Field name={'can_manage_students'} component={CellSwitch}
                   label={'Zarzadzanie kursantami'}
                   description={'Zaproszony uzytkownik bedzie mogl dodawac, usuwac, archwiizowac kursanow oraz nadawać im dostepne lekcje..'}
                   onChangeHandler={value => change(
                     'can_manage_students', value)}
                 />
          <Field name={'can_modify_schedules'} component={CellSwitch}
                   label={'Pozwalaj na ustalanie grafiku'}
                   description={'Zaproszony uzytkownik bedzie mogl ustawiac grafik.'}
                   onChangeHandler={value => change(
                     'can_modify_schedules', value)}
                 />
          <Field name={'is_driving'} component={CellSwitch}
                   label={'Jest instruktorem'}
                   description={'Lorem ipsum dolor sit melt'}
                   onChangeHandler={value => change(
                     'is_driving', value)}
                 />
        </Layout>
        <ButtonPrimary submitting={submitting}
                       onPress={this.submitForm}>Zapisz</ButtonPrimary>
      </View>
    );
  }
}

EditPrivileges = reduxForm({
  form: 'editEmployeePrivileges',
  onSubmitSuccess: (result, dispatch, props) => {
    const title = 'Congratulations!';
    const message = 'Your changes have been saved';

    const buttons = [
      {
        text: 'OK', onPress: () => {
        },
      }];

    Alert.alert(title, message, buttons);
  },
})(EditPrivileges);

EditPrivileges = LoadingHOC(EditPrivileges);

const mapStateToProps = state => {
  const { currentDrivingSchoolID, currentEmployeeID } = state.context;
  const { data, status } = state.employeePrivileges;

  return {
    drivingSchool: currentDrivingSchoolID,
    initialValues: { ...data, currentEmployeeID }, //currentEmployeeID optional, will be hooked api in reqest hook
    status: status,
  };
};

const mapDispatchToProps = dispatch => ( {
  requestData: () => dispatch(employeePrivilegesActionCreators.showRequest()),
} );

export default connect(mapStateToProps, mapDispatchToProps)(EditPrivileges);

// TODO extract edit field to separate components because used also in invite form
// TODO apply onSubmitSuccess on invite forms instead reacting in component will receive props
// TODO apply navigationOptions as a function in other navigators to remove redundancy
// TODO clear currentEmployee on unMount
