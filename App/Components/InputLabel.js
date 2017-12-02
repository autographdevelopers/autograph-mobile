import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../Themes/';

export default InputLable = ({required, label}) => {
  const styles = StyleSheet.create({
    labelContainer: {
      flexDirection: 'row'
    },
    label: {
      fontSize: Fonts.size.small,
      lineHeight: Fonts.size.small,
      color: Colors.strongGrey
    },
    asterix: {
      color: Colors.salmon,
      fontSize: Fonts.size.small,
      lineHeight: Fonts.size.small,
      marginLeft: 2
    }
  });
  return(
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
      { required && <Text style={styles.asterix}>*</Text>}
    </View>
  );
}
