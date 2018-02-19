import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../Themes/';
import Icon from 'react-native-vector-icons/Entypo';
import { SLOT_STATUS } from '../Lib/utils';

export default Slot = ({ slot, containerStyles={}, onPress=()=>{}, index }) => {

  const BULLET_SIZE = 7;
  const CHECK_BULLET_SIZE = 22;

  const isBooked = slot.status === SLOT_STATUS.BOOKED;
  const minutes = slot.start_hour.split(':')[1];

  const styles = StyleSheet.create({
    container: {
      height: 53,
      // position: 'absolute',
      left:0,right:0,
      flexDirection: 'row',
    },
    button: {
      backgroundColor: isBooked ? Colors.success : Colors.mediumGrey,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderTopColor: Colors.strongGrey,
    },
    rightSection: {
      flex: 1,
      paddingTop: ( Fonts.size.small + 8 ) / 2 - 1,
    },
    bullet: {
      width: BULLET_SIZE,
      height: BULLET_SIZE,
      borderRadius: 50,
      backgroundColor: Colors.strongGrey,
    },
    leftSection: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      width: 45,
      height: Fonts.size.small + 8,
    },
    timeText: {
      fontSize: Fonts.size.small,
      fontFamily: Fonts.type.base,
      fontWeight: minutes === '00'  ? '600' : '400',
      flex: 1,
    },
    intervalInfo: {
      color: Colors.snow,
      fontSize: 11,
      fontWeight: '500',
      fontFamily: Fonts.type.base,
    },
    title: {
      color: Colors.snow,
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.small,
      fontWeight: '800',
    },
    textContainer: {
      alignItems: 'center',
    },
    check: {
      width: CHECK_BULLET_SIZE,
      height: CHECK_BULLET_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: 'rgba(0, 0, 0, .32)',
      marginRight: 15,
      position: 'relative',
    },
    body: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={[styles.container, containerStyles]} >
      <View style={styles.leftSection}>
        <Text style={styles.timeText}>{slot.start_hour}</Text>
        <View style={styles.bullet}/>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          { isBooked &&
            <View style={styles.body}>
              <View style={styles.check}>
                <Icon name={'check'} color={Colors.snow} size={14}/>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.intervalInfo}>{`${slot.start_hour} - ${(parseInt(minutes) + 30)%60}`}</Text>
                <Text style={styles.title}>DYSPOZYCJA</Text>
              </View>
            </View>
          }
          { !isBooked && <View style={styles.body}><Text>---</Text></View> }
        </TouchableOpacity>
      </View>
    </View>
  );
};
