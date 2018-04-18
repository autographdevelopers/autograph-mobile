import React, { Component } from 'react';
import {Text, View } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default Pill = ({ children }) => {
  return (
    <View style={styles.pill}>
      <Text style={styles.intervalText}>{children}</Text>
    </View>
  );
}

const styles = {
  pill: {
    height: 25,
    width: 80,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  intervalText: {
    color: Colors.black,
    fontSize: Fonts.size.extraSmall,
    fontFamily: Fonts.type.light,
  }
};
