import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../Themes/';

export default ButtonOutline = ({color, children}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center'
    },
    button: {
      borderColor: color || Colors.white,
      borderWidth: 2,
      justifyContent: 'center',
      backgroundColor: Colors.transparent,
      borderRadius: 50,
      width: '62%',
      height: 45
    },
    text: {
      color: color || Colors.white,
      textAlign: 'center',
      fontSize: Fonts.size.medium,
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}
