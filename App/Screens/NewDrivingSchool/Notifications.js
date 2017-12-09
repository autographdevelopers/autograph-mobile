import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import CellSwitch from '../../Components/CellWithSwitch';
import { Colors, Fonts } from '../../Themes';
import InputField from '../../Components/InputField';
import { required } from '../../Lib/validators';

const styles = StyleSheet.create({
  removableInputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    // backgroundColor: Colors.snow,
    // flex: 1
  }
});

const renderSwitch = ({input, meta, componentProps}) => (
  <CellSwitch value={input.value} {...componentProps}/>
);

class NotificationsStep extends Component {
  static navigationOptions = {
    header: null
  };

    constructor(props) {
    super(props);
  }

  render() {
    const { change } = this.props;

    return (
      <View style={styles.container}>
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



        <Field name={'name'} component={InputField} label={'Nazwa'} required={true} validate={required}/>
      </View>
    )
  }
}

export default reduxForm({
  form: 'newDrivingSchool',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    push_notification: true,
    weekly_reports: false,
    monthly_reports: true
  }
})(NotificationsStep);
