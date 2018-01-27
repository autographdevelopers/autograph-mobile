import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default ButtonText = ({ children, position, onPress, customStyle={}, fontSize = Fonts.size.medium, icon }) => {
  const renderIcon = () => {
    if(icon){
      return icon
    }
  }

  const styles = StyleSheet.create({
    text: {
      color: Colors.primaryWarm,
      fontSize: fontSize,
      marginLeft: icon ? 3 : 0
    },
    button: {
      alignSelf: position,
      flexDirection: icon ? 'row' : 'column'
    }
  });

  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      {renderIcon()}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
