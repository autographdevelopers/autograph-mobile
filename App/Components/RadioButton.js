import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../Themes/';


export default RadioButton = ({input, meta, value}) => {
  const styles = StyleSheet.create({
    outline: {
      width: 25,
      height: 25,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: Colors.primaryWarm,
      justifyContent: 'center',
      alignItems: 'center'
    },
    fill: {
      width: 15,
      height: 15,
      borderRadius: 50,
      backgroundColor: Colors.primaryWarm
    }
  });

  return (
    <View style={styles.outline}>
      { value === input.value && <View style={styles.fill}/> }
    </View>
  );
}
