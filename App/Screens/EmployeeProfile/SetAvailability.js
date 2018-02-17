import React, { Component } from 'react';
import {
  Alert,
  Text,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Colors, Fonts } from '../../Themes/';
import { connect } from 'react-redux';
import Layout from '../../Components/Layout';
import ListHeader from '../../Components/ListHeader';
import { Field, reduxForm } from 'redux-form';
import {
  employeePrivilegesActionCreators,
  update,
} from '../../Redux/EmployeePrivileges';
// import LoadingHOC from '../../Containers/LoadingHOC';

class SetAvailability extends Component {

  submitForm = () => {
    this.props.handleSubmit(update)();
  };

  render() {
    const { change, submitting } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ListHeader title={'Dyspozycyjnosc'}/>
        <Text>Lorem ipsum dolor sit melt</Text>
      </View>
    );
  }
}

SetAvailability = reduxForm({
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
})(SetAvailability);

// SetAvailability = LoadingHOC(SetAvailability);

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

export default connect(mapStateToProps, mapDispatchToProps)(SetAvailability);
