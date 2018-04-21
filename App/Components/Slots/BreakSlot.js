import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';

export default BreakSlot = ({ slot }) => {
  return (
    <SlotLayout borderLeftColor={Colors.black} slot={slot}>
      <View style={styles.container}>
        <Text style={styles.text}>PRZERWA</Text>
      </View>
    </SlotLayout>
  );
}

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
