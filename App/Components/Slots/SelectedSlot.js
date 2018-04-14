import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';
import momentTimezone from 'moment-timezone';

export default SelectedSlot = ({onPressCancel, slot, remainingSeconds, isFirst, isLast }) => {
  const from =  momentTimezone(slot.start_time).tz('Europe/Warsaw').format('HH:mm');
  const to = momentTimezone(slot.start_time).add(30, 'minutes').tz('Europe/Warsaw').format('HH:mm');

  const allowUnlock = typeof onPressCancel === 'function';

  return (
    <SlotLayout borderLeftColor={Colors.yellowDark} slot={slot}>
      <View style={styles.body}>
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <Text style={styles.header}><Text style={styles.selected}>WYBRANO </Text><Text>{`${from} - ${to}`}</Text></Text>
            <View style={styles.bullet}/>
          </View>
        </View>

        {allowUnlock &&
          <View style={styles.btnWrapper}>
            {isLast && !isFirst && <View style={[styles.arrow, styles.arrowTop]}/>}
            <TouchableOpacity style={styles.btn} onPress={onPressCancel}>
              <Text style={styles.btnLabel}>ANULUJ</Text>
            </TouchableOpacity>
            {isFirst && !isLast && <View style={[styles.arrow, styles.arrowBottom]}/>}
          </View>
        }
      </View>
    </SlotLayout>
  );
}

const SIZE = 7;

const styles = {
  infoSection: {
    justifyContent: 'space-between'
  },
  textSubtitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.extraSmall,
    color: Colors.strongGrey,
  },
  textSubtitleStrong: {
    fontFamily: Fonts.type.medium,
    width: 30
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5
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
  },
  btn: {
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
  btnLabel: {
    color: Colors.primaryWarm,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
  },
  arrowTop: {
    borderBottomWidth: 10,
    borderBottomColor: Colors.lightGrey
  },
  arrowBottom: {
    borderTopWidth: 10,
    borderTopColor: Colors.lightGrey
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',

    borderRightColor: 'transparent',
    borderRightWidth: 10,
  },
  btnWrapper: {
    alignItems: 'center'
  }
};
