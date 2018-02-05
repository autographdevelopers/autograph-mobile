import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../Themes';

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: Colors.salmon,
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontFamily: Fonts.type.medium
  }
});

export default FormErrorMessage = ({children}) => {

  const message = children ? <Text style={styles.error}>{children}</Text> : null;

  return message
}

