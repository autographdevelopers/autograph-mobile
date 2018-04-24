import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';
import DefaultAvatar from '../DefaultAvatar';
import moment from 'moment/moment';
import Pill from '../IntervalPill';

import { slotHelper } from '../../Lib/SlotHelpers';
import _ from 'lodash';

export default DriveSlot = ({employee, currentUser, student, slot, onPress={onPress}}) => {
  const from = moment(slot.start_time).format('HH:mm');
  const to = moment(slot.end_time).format('HH:mm');

  const notCurrentStudentsLesson =
    currentUser.type === 'Student'
    && student
    && student.id !== currentUser.id;

  const currentStudentsLesson =
    currentUser.type === 'Student'
    && student
    && student.id === currentUser.id;

  // const canEmployeeCancelLesson =
  //   currentUser.type === 'Employee'
  //   && moment(slot.start_time).isBefore();


  return (
    <SlotLayout borderLeftColor={Colors.primaryWarm} slot={slot} >
      <TouchableOpacity style={styles.body} onPress={onPress}
                        disabled={notCurrentStudentsLesson || moment(slot.start_time).isBefore()}>
        { moment(slot.start_time).isBefore() && <View style={styles.inPast}/> }

        { currentUser.type === 'Employee' && student.name && student.surname &&
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <DefaultAvatar name={'W'} customSize={30}/>
            <Text>{`${student.name} ${student.surname}`}</Text>
          </View>
        }
        { notCurrentStudentsLesson &&
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Umówiona lekcja</Text>
        </View>
        }
        { currentStudentsLesson &&
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Moja lekcja!</Text>
        </View>
        }

        <Pill>{`${from} - ${to}`}</Pill>
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
  inPast: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.2)',
    backgroundColor: Colors.lightGrey,
    opacity: .5,
    zIndex: 100,
  }
};
