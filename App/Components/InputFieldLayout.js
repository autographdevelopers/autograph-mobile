import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import InputLabel from './InputLabel';

/** This component was originally designed to work with redux-form library.
 It receives input and meta object props(check docs) from redux form Field wrapper and also other props you pass to Field component
 **/

export default InputFieldLayout = ({ children, label, required, errors }) => {
  const styles = StyleSheet.create({
    errorZone: {
      color: Colors.salmon,
      fontSize: Fonts.size.small,
      marginTop: 5
    },
    container: {
      marginBottom: 15
    },
    childrenWrapper: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: errors ? Colors.salmon : Colors.mediumGrey,
    }
  });

  return (
    <View style={styles.container}>
      <InputLabel required={required} label={label}/>
      <View style={styles.childrenWrapper}>
        {children}
      </View>
      {errors && <Text style={styles.errorZone}>{errors}</Text>}
    </View>
  );
}
