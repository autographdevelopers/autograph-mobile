import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import CellSwitch from '../../Components/CellWithSwitch';
import { Colors, Fonts } from '../../Themes';
import InputField from '../../Components/InputField';
import { required } from '../../Lib/validators';
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';
import ButtonPrimary from '../../Components/ButtonPrimary';

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
    header: props => {
      console.log('NAVIGATION IN HEADER');
      console.log(props.navigation);

      // console.tron.log('NAVIGATION IN HEADER');
      // console.tron.log(props.navigation);
      return (<View><NavHeader navigation={props.navigation} title={'Information'}/><StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={1}/></View>)
    },
  };

    constructor(props) {
    super(props);
  }

  render() {
    const { change } = this.props;

    console.log('NAVIGATION IN COMPONENT');
    console.log(this.props.navigation );

    // console.tron.log('NAVIGATION IN COMPONENT');
    // console.tron.log(this.props.navigation );

    return (
      <Layout style={styles.container}>
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
