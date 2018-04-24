import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';
import Pill from '../IntervalPill';
import moment from 'moment-timezone';

export const WastedSlot = ({ slot }) => {
  return (
    <SlotLayout borderLeftColor={Colors.salmon} slot={slot}>
      <View style={styles.container}>
        <Text style={styles.text}>ZMARNOWANY SLOT</Text>
        <Pill>{`${moment(slot.start_time).format('HH:mm')} - ${moment(slot.end_time).format('HH:mm')}`}</Pill>
      </View>
    </SlotLayout>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    color: Colors.strongGrey
  }
};

