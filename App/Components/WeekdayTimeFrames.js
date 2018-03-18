import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { slotHelper } from '../Lib/SlotHelpers';
import CheckBox from './CheckBox';
import I18n from '../I18n/index';

export default WeekdayTimeFrames = ({input, meta}) => {
  return (
    <View style={styles.dayRow}>
      <View style={styles.weekdayLabelContainer}>
        <CheckBox value={true} setValue={()=>{}}/>
        <Text style={styles.weekdayLabel}>{I18n.t(`weekdays.normal.${input.name}`)}</Text>
      </View>

      <View style={styles.weekdayInfo}>
          {slotHelper.summarizeDay(input.value).map((interval, index) => (
            <Text>{interval} </Text>
            ))
          }
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
