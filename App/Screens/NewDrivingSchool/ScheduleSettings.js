import React, { Component } from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import CellSwitch from '../../Components/CellWithSwitch';
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';
import Layout from '../../Components/Layout';

const renderSwitch = ({ input, meta, componentProps }) => (
  <CellSwitch value={input.value} {...componentProps}/>
);

class ScheduleSettings extends Component {
  static navigationOptions = {
    header: props => {
      return (<View><NavHeader navigation={props.navigation} title={'Notifications'}/><StepsIndicators
        labels={['Informacje', 'Powiadomienia', 'Kalendarz', 'Ustawienia']} activeIndex={3}/></View>)
    }
  };

  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  render() {
    const { change } = this.props;

    return (
      <Layout>
        <Field name={'last_minute_booking_enabled'} component={renderSwitch}
               componentProps={{
                 label: 'Zapisy na ostatnia chwile',
                 description: 'Pozwalaj na zapisy mniej niż dzień przed planowaną jazdą..',
                 onChangeHandler: value => change('last_minute_booking_enabled', value)
               }}/>
        <Field name={'holidays_enrollment_enabled'} component={renderSwitch}
               componentProps={{
                 label: 'Święta i dni wolne od pracy',
                 description: 'Zablokuj możliwoś zapisów w dnia ustawowo wolne od pracy.',
                 onChangeHandler: value => change('holidays_enrollment_enabled', value)
               }}/>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'scheduleSettings',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    last_minute_booking_enabled: false,
    holidays_enrollment_enabled: false
  }
})(ScheduleSettings);
