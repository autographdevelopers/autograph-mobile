import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { slotHelper } from '../Lib/SlotHelpers';
import CheckBox from './CheckBox';
import I18n from '../I18n/index';
import {Fonts, Colors} from '../Themes/';

export default WeekdayTimeFrames = props => {
  const {
    setFormValue,
    active,
    input: { name, value },
    meta: { error },
    handlePress
  } = props;

  const sorted = value.sort((a, b) => a - b);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.dayRow, !active ? styles.not_active : {}]} >

        <View style={styles.weekdayLabelContainer}>
          <CheckBox value={sorted.length >=1} setValue={()=>setFormValue(name, [])}/>
          <Text style={styles.weekdayLabel}>
            {I18n.t(`weekdays.normal.${name.split('.').last()}`)}
          </Text>
        </View>

        <View style={styles.weekdayInfo}>
          { slotHelper.summarizeDay(sorted).map((interval, index) => (
            <Text style={styles.interval} key={index}>{interval}</Text>
            ))
          }
          { value.length === 0 && <Text style={styles.interval} >Nieczynne</Text> }
        </View>

      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  not_active: {
    opacity: .4
  },
  interval: {
    width: 140,
  },
  weekdayLabelContainer: {
    flexDirection: 'row',
    width: 140,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
