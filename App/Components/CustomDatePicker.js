import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Fonts, Colors } from '../Themes/';

const styles = StyleSheet.create({
  datepicker: {
    alignItems: 'center'
  },
  datepickerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  datepickerLabel: {
    fontSize: Fonts.size.medium,
    color: Colors.primaryWarm
  }
});

const datepickerCustom = {
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
    height: Fonts.size.medium
  },
  dateText: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    color: Colors.primaryWarm
  },
  dateTouchBody: {
    height: Fonts.size.medium
  },
  btnTextConfirm: {
    color: Colors.primaryWarm
  }
};

export default class CustomDatePicker extends Component{
  render() {
    return(
      <DatePicker
        style={styles.datepicker}
        customStyles={datepickerCustom}
        showIcon={false}
        placeholder="YYYY-MM-DD"
        format="YYYY-MM-DD"
        confirmBtnText="Potwierdz"
        cancelBtnText="Anuluj"
        {...this.props.datePickerConfiguration}
      />
    );
  }
}
