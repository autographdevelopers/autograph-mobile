import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../Themes/';

export default ButtonWhiteFill = ({color, children, onPress}) => {

  const styles = StyleSheet.create({
    button: {
      borderColor: color || Colors.snow,
      borderWidth: 2,
      justifyContent: 'center',
      backgroundColor: Colors.snow,
      borderRadius: 50,
      width: '62%',
      height: 50
    },
    text: {
      color: color || Colors.softBlack,
      textAlign: 'center',
      fontSize: Fonts.size.medium,
      fontWeight: '700'
    }
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
