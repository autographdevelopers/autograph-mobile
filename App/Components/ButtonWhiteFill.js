import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import { debouncePressEvent } from '../Lib/utils';

export default ButtonWhiteFill = ({ color, children, onPress }) => {
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
      fontFamily: Fonts.type.medium,
      letterSpacing: 1.2 // ios only
    }
  });

  return (
    <TouchableOpacity style={styles.button} onPress={debouncePressEvent(onPress)}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
