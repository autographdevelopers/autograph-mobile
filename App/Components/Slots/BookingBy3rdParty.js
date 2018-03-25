import SlotLayout from './SlotLayout';
import { View, Text } from 'react-native';
import { Fonts, Colors } from '../../Themes/';
import React, { Component } from 'react';
import Spinner from 'react-native-spinkit';

export default SlotBookingBy3rdParty = props => {

  return (
    <SlotLayout borderLeftColor={Colors.strongGrey} hour={'12:00'}>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.text}>Ktoś właśnie rezerwuje jazdę o tej porze</Text>
          <Spinner color={Colors.strongGrey} type={'ThreeBounce'} isVisible={true} size={Fonts.size.medium}/>
        </View>
      </View>
    </SlotLayout>
  );
}

const styles = {
  body: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: Colors.strongGrey,
    paddingHorizontal: 10
  }
};
