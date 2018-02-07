import React, { Component } from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import CellSwitch from '../../Components/CellWithSwitch';
import Layout from '../../Components/Layout';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';
import { connect } from 'react-redux';
import FORM_IDS from './Constants';
import { updateNotificationSettings } from '../../Redux/EmployeeNotificationsSettingsSetRedux';
import { notificationSettingsActionCreators } from '../../Redux/EmployeeNotificationsSettingsSetRedux';
import LoadingHOC from '../../Containers/LoadingHOC';

const FORM_ID = FORM_IDS.USER_NOTIFICATIONS;

class NotificationsStep extends Component {
  constructor(props) {
    super(props);

    if ( this.props.screenProps && this.props.screenProps.bindScreenRef ) {
      const key = this.props.navigation.state.routeName;
      this.props.screenProps.bindScreenRef(key, this);
    }
  }

  submitForm() {
    this.props.handleSubmit(updateNotificationSettings)();
  }

  render() {
    const { change, error } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <Field
          name="push_notifications_enabled"
          component={CellSwitch}
          label={'Otrzymuj powiadomienia push'}
          description={'Bedziesz otrzymywał co jakiś czas powiadomienia nawet jesli Twoja aplikacja będzie zamknięta.'}
          onChangeHandler={value => change('push_notifications_enabled',
            value)}
        />
        <Field
          name="weekly_emails_reports_enabled"
          component={CellSwitch}
          label={'Otrzymuj raporty tygodniowe'}
          description={'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.'}
          onChangeHandler={value => change('weekly_emails_reports_enabled',
            value)}
        />
        <Field
          name="monthly_emails_reports_enabled"
          component={CellSwitch}
          label={'Otrzymuj raporty miesieczne'}
          description={'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.'}
          onChangeHandler={value => change('monthly_emails_reports_enabled',
            value)}
        />
      </Layout>
    );
  }
}

NotificationsStep = reduxForm({
  form: FORM_ID,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    push_notifications_enabled: true,
    weekly_emails_reports_enabled: false,
    monthly_emails_reports_enabled: true,
  },
  onSubmitSuccess: (result, dispatch, props) => {
    const { navigation } = props;

    try {
      navigation.state.params.handleSubmitSuccess();
    } catch ( error ) {
      navigation.navigate('step2');
    }
  },
})(NotificationsStep);

NotificationsStep = LoadingHOC(NotificationsStep);

const mapStateToProps = state => ( {
  drivingSchool: state.context.currentDrivingSchoolID,
  status: state.notificationsSettingsSet.status,
  initialValues: state.notificationsSettingsSet.settings,
} );

const mapDispatchToProps = dispatch => ( {
  requestData: () => dispatch(notificationSettingsActionCreators.showRequest()),
} );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsStep);
