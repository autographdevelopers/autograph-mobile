import React, { Component } from 'react';
import { Text, ScrollView, Alert, View } from 'react-native';
import { reduxForm } from 'redux-form';
import FORM_IDS from './Constants';
import { NavigationActions } from 'react-navigation';
import { confirmDrivingSchoolRegistration } from '../../Redux/DrivingSchoolRedux';
import { connect } from 'react-redux';

class ConfirmRegistration extends Component {
  constructor(props) {
    super(props);

    if ( this.props.screenProps && this.props.screenProps.bindScreenRef ) {
      const key = this.props.navigation.state.routeName;
      this.props.screenProps.bindScreenRef(key, this);
    }
  }
  submitForm() {
    this.props.handleSubmit(confirmDrivingSchoolRegistration)();
  }

  render() {
    return (
      <View>
        <Text style={{textAlign: 'center'}}>CONFIRM REGISTRATION</Text>
      </View>
    )
  }
}

ConfirmRegistration = reduxForm({
  form: FORM_IDS.CONFIRM_REGISTRATION,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmitSuccess: (result, dispatch, props) => {
    const { navigation } = props;
    const { screenProps } = props;
    const { navKey } = screenProps;
    const title = 'Congratulations!';
    const message = 'Your registration completed successfully. Once we verify your request you can start your work.';
    const goToStartScreen = NavigationActions.back({ key: navKey });
    const buttons = [
      {
        text: 'OK', onPress: () => {
          navigation.dispatch(goToStartScreen);
        },
      }];

    Alert.alert(title, message, buttons);
  }
})(ConfirmRegistration);

const mapStateToProps = (state, otherProps) => {
  const { drivingSchoolId } = otherProps.screenProps;

  return {
    initialValues: { driving_school_id: drivingSchoolId },
  };
};

export default connect(mapStateToProps)(ConfirmRegistration);
