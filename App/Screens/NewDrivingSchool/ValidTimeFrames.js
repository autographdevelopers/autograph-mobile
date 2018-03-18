import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  scheduleSettingsActionCreators,
  updateScheduleSettings,
} from '../../Redux/ScheduleSettingsRedux';

import ScheduleBoundariesPicker from '../../Components/ScheduleBoundariesView';
import Layout from '../../Components/Layout';
import FORM_IDS from './Constants';
import LoadingHOC from '../../Containers/LoadingHOC';

const INITIAL_STATE = {
  valid_time_frames: {
    monday: [0, 32],
    tuesday: [0, 40],
    wednesday: [0, 40],
    thursday: [0, 40],
    friday: [0, 40],
    saturday: [0, 40],
    sunday: [0, 40],
  }
};

const FORM_ID = FORM_IDS.SCHEDULE_BOUNDARIES;

class ScheduleBoundaries extends Component {
  constructor(props) {
    super(props);

    if (this.props.screenProps && this.props.screenProps.bindScreenRef) {
      const key = this.props.navigation.state.routeName;
      this.props.screenProps.bindScreenRef(key, this);
    }
  }

  componentWillUnmount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.handleSubmitSuccess) {
      this.props.destroy();
    }
  }

  submitForm = () => {
    this.props.handleSubmit(updateScheduleSettings)();
  };

  render() {
    console.log(this.props);
    const { change, error, navigation, submitting } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <Field name={'valid_time_frames'}
               component={ScheduleBoundariesPicker} />
        {navigation.state.params && navigation.state.params.singleton &&
          <ButtonPrimary submitting={submitting} onPress={this.submitForm}>Zapisz</ButtonPrimary>
        }
      </Layout>
    )
  }
}

ScheduleBoundaries = reduxForm({
  form: FORM_ID,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmitSuccess: (result, dispatch, props) => {
    const { navigation } = props;

    try {
      navigation.state.params.handleSubmitSuccess();
    } catch (error) {
      navigation.navigate('step3');
    }
  }
})(ScheduleBoundaries);

// ScheduleBoundaries = LoadingHOC(ScheduleBoundaries);

const mapStateToProps = state => {
  return {
    drivingSchool: state.context.currentDrivingSchoolID,
    initialValues: INITIAL_STATE,
    status: state.scheduleSettings.status
  }
};

const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(scheduleSettingsActionCreators.showRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBoundaries);

/**
 @1 since arrow functions does NOT autobind context,
 the function will look for "this" in outside context frame which is React Component(ScheduleBoundaries).
 Alternatively one can use this.props.setValue.apply(this, [arg]) in mentioned component.
 **/
