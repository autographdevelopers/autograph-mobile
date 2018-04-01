import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';

export default SelectedSlot = ({onPressCancel, slot, remainingSeconds }) => {

  return (
    <SlotLayout borderLeftColor={Colors.yellowDark} hour={'12:00'}>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text style={styles.header}><Text style={styles.selected}>WYBRANO</Text><Text> (8:00 - 9:00)</Text></Text>
          <View style={styles.bullet}/>
        </View>
        <Text>Pozostało <Text>{remainingSeconds} sekund</Text> do zwolnienia slotu</Text>
        <TouchableOpacity style={styles.btn} onPress={onPressCancel(slot)}>
          <Text style={styles.btnLabel}>ANULUJ</Text>
        </TouchableOpacity>
      </View>
    </SlotLayout>
  );
}

const SIZE = 7;

const styles = {
  body: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  header: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: Colors.softBlack,
  },
  selected: {
    fontWeight: '600'
  },
  bullet: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE/2,
    backgroundColor: Colors.yellowDark,
    marginLeft: 5
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  btn: {
    // paddingHorizontal: 15,
    // paddingVertical: 5,
    backgroundColor: Colors.lightGrey,
    // borderRadius: 10
  },
  btnLabel: {
    color: Colors.primaryWarm,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
  }
};
