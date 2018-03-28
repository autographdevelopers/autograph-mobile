import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default ListHeaderSmall = ({label}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles= {
  container: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 5,
    paddingLeft: 5
  },
  text: {
    color: Colors.strongGrey,
    fontFamily: Fonts.type.light
  }
};
