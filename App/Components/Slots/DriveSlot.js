import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';
import DefaultAvatar from '../DefaultAvatar';
import moment from 'moment/moment';
import { slotHelper } from '../../Lib/SlotHelpers';
import _ from 'lodash';

export default DriveSlot = ({employee, student, slot, onPress={onPress}}) => {
  const from = moment(slot.start_time).format('HH:mm');
  const to = moment(slot.end_time).format('HH:mm');

  return (
    <SlotLayout borderLeftColor={Colors.primaryWarm} slot={slot} >
      <TouchableOpacity style={styles.body} onPress={onPress}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <DefaultAvatar name={'W'} customSize={30}/>
          <Text>{`${student.name} ${student.surname}`}</Text>
        </View>

        <View style={styles.pill}>
          <Text style={styles.intervalText}>{`${from} - ${to}`}</Text>
        </View>
      </TouchableOpacity>
    </SlotLayout>
  );
}

const styles = {
  body: {
    flex: 1,
    backgroundColor: Colors.snow,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: Colors.primaryWarm,
    textAlign: 'center',
  },
  pill: {
    height: 25,
    width: 80,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  intervalText: {
    color: Colors.black,
    fontSize: Fonts.size.extraSmall,
    fontFamily: Fonts.type.light,
  }
};
