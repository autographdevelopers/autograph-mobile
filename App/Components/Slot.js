import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../Themes/';
import Icon from 'react-native-vector-icons/Entypo';

export default Slot = ({ start, checked }) => {

  const BULLET_SIZE = 7;
  const CHECK_BULLET_SIZE = 22;

  const styles = StyleSheet.create({
    container: {
      height: 53,
      flexDirection: 'row',
    },
    button: {
      backgroundColor: Colors.success,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 2,
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
      backgroundColor: Colors.snow,
      flexDirection: 'row',
      alignItems: 'center',
      width: 45,
      height: Fonts.size.small + 8,
    },
    timeText: {
      fontSize: Fonts.size.small,
      fontFamily: Fonts.type.base,
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
      backgroundColor: 'rgba(360, 50, 0, .32)',
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
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.timeText}>09:00</Text>
        <View style={styles.bullet}/>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.body}>
            <View style={styles.check}>
              <Icon name={'check'} color={Colors.snow} size={14}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.intervalInfo}>9:00 - 9:30</Text>
              <Text style={styles.title}>DYSPOZYCJA</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
