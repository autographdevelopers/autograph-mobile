import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';

export const WastedSlot = ({ slot }) => {
  return (
    <SlotLayout borderLeftColor={Colors.salmon} slot={slot}>
      <Text>..:Zmarnowany Slot:..</Text>
    </SlotLayout>
  );
}

