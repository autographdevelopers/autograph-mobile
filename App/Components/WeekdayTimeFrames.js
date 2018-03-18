import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { slotHelper } from '../Lib/SlotHelpers';
import CheckBox from './CheckBox';
import I18n from '../I18n/index';
import {Fonts, Colors} from '../Themes/';

export default WeekdayTimeFrames = props => {
  const {setFormValue, active, input: {name, value}, meta: {error}, handlePress} = props;

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.dayRow, !active ? styles.not_active : {}]} >
        <View style={styles.weekdayLabelContainer}>
          <CheckBox value={value.length >=1} setValue={()=>setFormValue(name, [])}/>
          <Text style={styles.weekdayLabel}>
            {I18n.t(`weekdays.normal.${name.split('.').last()}`)}
            </Text>
        </View>

        <View style={styles.weekdayInfo}>
            {slotHelper.summarizeDay(value).map((interval, index) => (
              <Text key={index}>{interval} </Text>
              ))
            }
            {value.length === 0 && <Text>NIE CZYNNE</Text>}
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  not_active: {
    opacity: .4
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
  },
  error: {
    color: 'red',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.light
  }
});
