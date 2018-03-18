import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { slotHelper } from '../Lib/SlotHelpers';
import CheckBox from './CheckBox';
import I18n from '../I18n/index';

export default WeekdayTimeFrames = props => {
  const {setFormValue, input: {name, value}} = props;

  return (
    <View style={styles.dayRow}>
      <View style={styles.weekdayLabelContainer}>
        <CheckBox value={value.length >=1} setValue={()=>setFormValue(name, [])}/>
        <Text style={styles.weekdayLabel}>{I18n.t(`weekdays.normal.${name}`)}</Text>
      </View>

      <View style={styles.weekdayInfo}>
          {slotHelper.summarizeDay(value).map((interval, index) => (
            <Text key={index}>{interval} </Text>
            ))
          }
          {value.length === 0 && <Text> - : -  - : - </Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  weekdayInfo: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 5,
    marginLeft: 5,
    flexDirection: 'row'
  },
  weekdayLabelContainer: {
    flexDirection: 'row',
    width: 110,
    alignItems: 'center'
  },
  weekdayLabel: {
    marginHorizontal: 10,
    marginVertical: 10
  }
});
