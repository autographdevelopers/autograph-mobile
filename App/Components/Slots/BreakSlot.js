import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';

export default BreakSlot = ({ slot }) => {
  return (
    <SlotLayout borderLeftColor={Colors.black} slot={slot}>
      <Text>..:Przerwa:..</Text>
    </SlotLayout>
  );
}

