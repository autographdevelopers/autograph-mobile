import React, { Component } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default CellWithSwitch = ({ children, position, onPress, customStyle={}, customTextStyle={} }) => {
  const styles = StyleSheet.create({
    text: {
      color: Colors.primaryWarm,
      fontSize: Fonts.size.medium
    },
    button: {
      alignSelf: position
    }
  });

  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      <Animated.Text style={[styles.text, customTextStyle]}>{children}</Animated.Text>
    </TouchableOpacity>
  );
}
