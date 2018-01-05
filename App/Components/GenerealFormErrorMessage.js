import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../Themes';

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: Colors.salmon,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    borderColor: Colors.salmon,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5
  }
});

export default FormErrorMessage = ({children}) => {

  const message = children ? <Text style={styles.error}>{children}</Text> : null;

  return message
}

