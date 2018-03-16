import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default BindingFromBox = ({onPress, date, label}) => {
  return(
    <TouchableOpacity onPress={onPress} style={styles.changeOfScheduleContainer}>
      <View style={styles.dotsColumn}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <View style={styles.changeOfScheduleInfoBox}>
        <Text style={[styles.changeOfScheduleLabel, styles.date]}>{date}</Text>
        <Text style={styles.changeOfScheduleLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  changeOfScheduleContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 15
  },
  changeOfScheduleInfoBox: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: Colors.subtleGray,
  },
  changeOfScheduleLabel: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
  },
  dotsColumn: {
    height: 35,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: Colors.mediumGrey
  },
  date: {
    marginRight: 5,
    color: Colors.primaryWarm
  }
};
