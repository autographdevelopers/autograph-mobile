import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';

export default FreeSlot = ({ hour='12:00', slot, onPress=()=>()=>{} }) => {

  return (
    <SlotLayout borderLeftColor={Colors.strongGrey} hour={hour}>
      <TouchableOpacity style={styles.body} onPress={onPress(slot)}>
        <Text style={styles.text}>UMÓW JAZDĘ</Text>
      </TouchableOpacity>
    </SlotLayout>
  );
}

const styles = {
  body: {
    flex: 1,
    backgroundColor: Colors.snow,
    justifyContent: 'center'
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: Colors.primaryWarm,
    textAlign: 'center'
  }
};
