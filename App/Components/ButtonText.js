import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default CellWithSwitch = ({ children, position, onPress }) => {
  const styles = StyleSheet.create({
    text: {
      color: Colors.primaryWarm,
      // fontWeight: 'bold',
      fontSize: Fonts.size.medium
    },
    button: {
      alignSelf: position
    }
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
