/** Lib dependencies */
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
/** Custom dependencies */
import { Colors, Fonts } from '../Themes';

export default SectionHeader = ({title, customTextStyles={}, customUnderlineStyles={}, customContainerStyle={}}) => (
  <View style={[styles.container, customContainerStyle]}>
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
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    color: Colors.strongGrey,
    fontWeight: '400',
  },
  underline: {
    borderColor: Colors.primaryWarm,
    borderRadius: 10,
    width: 30,
    borderWidth: 1,
    marginTop: 2
  }
};
