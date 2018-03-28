/** Lib dependencies */
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
/** Custom dependencies */
import { Colors, Fonts } from '../Themes';

export default SectionHeader = ({title, customTextStyles={}, customUnderlineStyles={}}) => (
  <View style={styles.container}>
    <Text style={[styles.listHeader, customTextStyles]}>
      {title}
    </Text>
    <View style={[styles.underline, customUnderlineStyles]}/>
  </View>
)

const styles = {
  container: {
    backgroundColor: Colors.snow
  },
  listHeader: {
    fontSize: 20,
    color: Colors.softBlack,
  },
  underline: {
    marginTop: 8,
    width: 45,
    borderColor: Colors.primaryWarm,
    borderWidth: 2,
    borderRadius: 10,
  }
};
