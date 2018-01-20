import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl, Alert,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import Layout from '../../Components/Layout';
import ListHeader from '../../Components/ListHeader';
import { Field, reduxForm, FormSection } from 'redux-form';
import CellSwitch from '../../Components/CellWithSwitch';
import { update } from '../../Redux/EmployeePrivileges';
import LoadingHOC from '../../Containers/LoadingHOC';
import { employeePrivilegesActionCreators } from '../../Redux/EmployeePrivileges';
import { NavigationActions } from 'react-navigation';

const renderSwitch = ({ input, meta, componentProps }) => (
  <CellSwitch value={input.value} {...componentProps}/>
);

class ManageEmployee extends Component {

  submitForm = () => {
    this.props.handleSubmit(update)();
  };

  componentWillUnmount() {
    NavigationActions.setParams({
     animate: true
    });
    console.log('Unmounting...');
    this.props.navigation.setParams({animate: true});
  };

  render() {
    const { change, submitting } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ListHeader title={'Uprawnienia'}/>
        <Layout>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              <Field name={'can_manage_employees'} component={renderSwitch}
                     componentProps={{
                       label: 'Zarzadzanie pracownikami',
                       description: 'Zaproszony uzytkownik bedzie mogl dodawac, usuwac pracownikow ze szkoly oraz nadawac im przywileje.',
                       onChangeHandler: value => change(
                         'can_manage_employees', value),
                     }}/>
              <Field name={'can_manage_students'} component={renderSwitch}
                     componentProps={{
                       label: 'Zarzadzanie kursantami',
                       description: 'Zaproszony uzytkownik bedzie mogl dodawac, usuwac, archwiizowac kursanow oraz nadawać im dostepne lekcje..',
                       onChangeHandler: value => change(
                         'can_manage_students', value),
                     }}/>
              <Field name={'can_modify_schedules'} component={renderSwitch}
                     componentProps={{
                       label: 'Pozwalaj na ustalanie grafiku',
                       description: 'Zaproszony uzytkownik bedzie mogl ustawiac grafik.',
                       onChangeHandler: value => change(
                         'can_modify_schedules', value),
                     }}/>
              <Field name={'is_driving'} component={renderSwitch}
                     componentProps={{
                       label: 'Jest instruktorem',
                       description: 'Lorem ipsum dolor sit melt',
                       onChangeHandler: value => change(
                         'is_driving', value),
                     }}/>
            </ScrollView>
          <ButtonPrimary submitting={submitting}
                         onPress={this.submitForm}>Zapisz</ButtonPrimary>
        </Layout>
      </View>
    );
  }
}

ManageEmployee = reduxForm({
  form: 'editEmployeePrivileges',
  onSubmitSuccess: (result, dispatch, props) => {
    const title = 'Congratulations!';
    const message = 'Your changes have been saved';

    const buttons = [
      {
        text: 'OK', onPress: () => {
          // this.props.screenProps.takeMeBack();
        },
      }];

    Alert.alert(title, message, buttons);

  },
})(ManageEmployee);

ManageEmployee = LoadingHOC(ManageEmployee);

const mapStateToProps = state => {
  const { currentDrivingSchoolID, currentEmployeeID } = state.context;
  const { data, status } = state.employeePrivileges;

  return {
    drivingSchool: currentDrivingSchoolID,
    initialValues: {...data, currentEmployeeID}, //currentEmployeeID optional, will be hooked api api req hook
    status: status,
  };
};

const mapDispatchToProps = dispatch => ( {
  requestData: () => dispatch(employeePrivilegesActionCreators.showRequest()),
} );

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);

// TODO extract edit field to separate components because used also in invite form
// TODO apply onSubmitSuccess on invite forms instead reacting in component will receive props
// TODO apply navigationOptions as a function in other navigators to remove redundancy
// TODO clear currentEmployee on unMount
