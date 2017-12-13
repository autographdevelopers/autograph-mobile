import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default CellWithSwitch = ({ children, position, onPress, customStyle={} }) => {
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
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
