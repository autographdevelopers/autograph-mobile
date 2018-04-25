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
    color: Colors.softBlack,
  },
  underline: {
    borderColor: Colors.primaryWarm,
    borderRadius: 10,
    width: 20,
    borderWidth: 1,
    marginTop: 1
  }
};
