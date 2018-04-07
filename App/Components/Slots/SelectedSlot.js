import SlotLayout from './SlotLayout';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';
import momentTimezone from 'moment-timezone';

export default SelectedSlot = ({onPressCancel, slot, remainingSeconds }) => {
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
          <Text style={styles.textSubtitle}>Pozostało
            <Text style={styles.textSubtitleStrong}> {remainingSeconds} sek.</Text> do zwolnienia slotu</Text>
        </View>

        {allowUnlock &&
          <TouchableOpacity style={styles.btn} onPress={onPressCancel}>
            <Text style={styles.btnLabel}>ANULUJ</Text>
          </TouchableOpacity>
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
  }
};
