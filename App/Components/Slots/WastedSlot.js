import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';

export const WastedSlot = ({ slot }) => {
  return (
    <SlotLayout borderLeftColor={Colors.salmon} slot={slot}>
      <View style={styles.container}>
        <Text style={styles.text}>ZMARNOWANY SLOT</Text>
      </View>
    </SlotLayout>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.strongGrey
  }
};

