import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';

export default FreeSlot = props => {

  return (
    <SlotLayout borderLeftColor={Colors.strongGrey} hour={'12:00'}>
      <TouchableOpacity style={styles.body}>
        <Text style={styles.text}>UMÓW JAZDĘ</Text>
      </TouchableOpacity>
    </SlotLayout>
  );
}

const styles = {
  body: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center'
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: Colors.primaryWarm,
    textAlign: 'center'
  }
};
