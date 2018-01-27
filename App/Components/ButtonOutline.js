import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default ButtonOutline = ({ color=Colors.snow, children, onPress, submitting=false }) => {
  const styles = StyleSheet.create({
    button: {
      borderColor: color,
      borderWidth: 2,
      justifyContent: 'center',
      backgroundColor: Colors.transparent,
      borderRadius: 50,
      width: '62%',
      height: 50
    },
    text: {
      color: color || Colors.snow,
      textAlign: 'center',
      fontSize: Fonts.size.medium,
      fontWeight: '700'
    }
  });

  let body;
  if(submitting) {
    body = <ActivityIndicator size={'large'} color={color}/>
  } else {
    body = (<TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>)
  }
  return body;
}
