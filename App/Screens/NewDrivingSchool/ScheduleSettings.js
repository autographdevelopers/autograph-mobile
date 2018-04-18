import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import CellSwitch from '../../Components/CellWithSwitch';
import Layout from '../../Components/Layout';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';
import { updateScheduleSettings } from '../../Redux/ScheduleSettingsRedux';
import { scheduleSettingsActionCreators } from '../../Redux/ScheduleSettingsRedux';
import FORM_IDS from './Constants';

import { connect } from 'react-redux';
import LoadingHOC from '../../HOC/LoadingHOC';

const FORM_ID = FORM_IDS.SCHEDULE_SETTINGS;

class ScheduleSettings extends Component {
  constructor(props) {
    super(props);

    if ( this.props.screenProps && this.props.screenProps.bindScreenRef ) {
      const key = this.props.navigation.state.routeName;
      this.props.screenProps.bindScreenRef(key, this);
    }
  }

  componentWillUnmount() {
    if ( this.props.navigation.state.params &&
      this.props.navigation.state.params.handleSubmitSuccess ) {
      this.props.destroy();
    }
  }

  submitForm = () => {
    this.props.handleSubmit(updateScheduleSettings)();
  };

  render() {
    const { change, error, navigation, submitting } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <Field name={'last_minute_booking_enabled'} component={CellSwitch}
               label={'Zapisy na ostatnia chwile'}
               description={'Pozwalaj na zapisy mniej niż dzień przed planowaną jazdą..'}
               onChangeHandler={value => change('last_minute_booking_enabled',
                 value)}
        />
        <Field name={'holidays_enrollment_enabled'} component={CellSwitch}
               label={'Święta i dni wolne od pracy'}
               description={'Zablokuj możliwoś zapisów w dnia ustawowo wolne od pracy.'}
               onChangeHandler={value => change('holidays_enrollment_enabled',
                 value)}
        />
        {navigation.state.params && navigation.state.params.singleton &&
        <ButtonPrimary submitting={submitting}
                       onPress={this.submitForm}>Zapisz</ButtonPrimary>}
      </Layout>
    );
  }
}

ScheduleSettings = reduxForm({
  form: FORM_ID,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    last_minute_booking_enabled: true,
    holidays_enrollment_enabled: false,
  },
  onSubmitSuccess: (result, dispatch, props) => {
    const { navigation } = props;

    try {
      navigation.state.params.handleSubmitSuccess();
    } catch ( error ) {
      navigation.navigate('step4');
    }
  },
})(ScheduleSettings);

ScheduleSettings = LoadingHOC(ScheduleSettings);

const mapStateToProps = state => {
  const { currentDrivingSchoolID } = state.context;
  const {valid_time_frames, ...otherSettings} = state.scheduleSettings;

  return {
    drivingSchool: currentDrivingSchoolID,
    initialValues: otherSettings,
    status: state.scheduleSettings.status,
  };
};

const mapDispatchToProps = dispatch => ( {
  requestData: () => dispatch(scheduleSettingsActionCreators.showRequest()),
} );

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSettings);
