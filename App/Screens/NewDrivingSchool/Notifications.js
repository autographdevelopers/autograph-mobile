import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import CellSwitch from '../../Components/CellWithSwitch';
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';

const renderSwitch = ({input, meta, componentProps}) => (
  <CellSwitch value={input.value} {...componentProps}/>
);

class NotificationsStep extends Component {
  static navigationOptions = {
    header: props => {
      return (<View><NavHeader navigation={props.navigation} title={'Information'}/><StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={1}/></View>)
    },
  };

  componentDidMount() {
    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  submitForm() {
    console.log(`Submitting ${this.props.navigation.state.routeName}..`);
  }

  render() {
    const { change } = this.props;

    return (
      <Layout customStyles={{paddingTop: 0}}>
        <Field name={'push_notification'} component={renderSwitch}
               componentProps={{label: 'Otrzymuj powiadomienia push',
               description: 'Bedziesz otrzymywał co jakiś czas powiadomienia nawet jesli Twoja aplikacja będzie zamknięta.',
               onChangeHandler: value => change('push_notification', value)
               }}/>
        <Field name={'weekly_reports'} component={renderSwitch}
               componentProps={{label: 'Otrzymuj raporty tygodniowe',
               description: 'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.',
               onChangeHandler: value => change('weekly_reports', value)}}/>
        <Field name={'monthly_reports'} component={renderSwitch}
               componentProps={{label: 'Otrzymuj raporty miesieczne',
               description: 'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.',
               onChangeHandler: value => change('monthly_reports', value)
               }}/>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'notificationSettings',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    push_notification: true,
    weekly_reports: false,
    monthly_reports: true
  }
})(NotificationsStep);
