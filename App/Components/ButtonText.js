import React, { Component } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default ButtonText = ({ children, position, onPress, customStyle={}, customTextStyle={}, icon }) => {
  const renderIcon = () => {
    if(icon){
      return icon
    }
  }

  const styles = StyleSheet.create({
    text: {
      color: Colors.primaryWarm,
      fontSize:  Fonts.size.medium,
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
      <Animated.Text style={[styles.text, customTextStyle]}>{children}</Animated.Text>
    </TouchableOpacity>
  );
}
