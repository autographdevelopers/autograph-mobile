import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import CellSwitch from '../../Components/CellWithSwitch';

const styles = StyleSheet.create({
  removableInputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

// const Switch

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
      <View>
        <CellSwitch label={'Otrzymuj powiadomienia push'}
                    description={'Bedziesz otrzymywał co jakiś czas powiadomienia nawet jesli Twoja aplikacja będzie zamknięta.'}
                    value={true}/>
        <CellSwitch label={'Otrzymuj raporty tygodniowe'}
                    description={'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.'}/>
        <CellSwitch label={'Otrzymuj raporty miesieczne'}
                    description={'Będziesz otrzymywał pod koniec tygodnia, email z lorem ipsum.'} value={true}/>
      </View>
    )
  }
}

export default reduxForm({
  form: 'newDrivingSchool',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(NotificationsStep);
