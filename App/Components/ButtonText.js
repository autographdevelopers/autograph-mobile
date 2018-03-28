import React, { Component } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default ButtonText = ({ children, position, onPress, customStyle={}, customTextStyle={}, icon, visible=true }) => {
  const styles = StyleSheet.create({
    text: {
      color: Colors.primaryWarm,
      fontSize:  Fonts.size.medium,
      fontFamily: Fonts.type.base,
      marginLeft: icon ? 3 : 0
    },
    button: {
      alignSelf: position,
      flexDirection: 'row',
      alignItems: 'center'
    }
  });

  let body = null;

  if(visible)
    body = <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      {icon}
      <Animated.Text style={[styles.text, customTextStyle]}>{children}</Animated.Text>
    </TouchableOpacity>

  return body
}
