import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Colors, Fonts } from '../Themes/';

export default BlockButton = ({customContainerStyles={}, customTextStyles={}, children, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, customContainerStyles]} onPress={onPress}>
      <Text style={[styles.text, customTextStyles]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
};

const styles = {
  container: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryWarm
  },
  text: {
    color: Colors.snow,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium
  }
};
