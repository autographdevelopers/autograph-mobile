import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import CellSwitch from '../../Components/CellWithSwitch';
import { Colors } from '../../Themes';
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

class Calendar extends Component {
  static navigationOptions = {
    header: props => <View><NavHeader navigation={props.navigation} title={'Information'}/><StepsIndicators labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={2}/></View>,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Calendar</Text>
      </View>
    )
  }
}

export default reduxForm({
  form: 'newDrivingSchool',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(Calendar);
