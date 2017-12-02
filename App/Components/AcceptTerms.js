import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import InputFieldLayout from './InputFieldLayout';
import CheckBox from './CheckBox';

export default RadioButtonPairInputField = ({ input, meta, setValue, inputLabel, required = false, text }) => {
  const styles = StyleSheet.create({
    acceptTermsRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    acceptTermsLabel: {
      fontSize: Fonts.size.small,
      color: Colors.strongGrey,
      marginLeft: 20
    },
  });

  return (
    <InputFieldLayout meta={meta} label={inputLabel} required={required} line={false} customErrorStyles={{textAlign: 'center'}}>
      <View style={styles.acceptTermsRow}>
        <CheckBox value={input.value} setValue={setValue(!input.value)}/>
        <Text style={styles.acceptTermsLabel}>{text}</Text>
      </View>
    </InputFieldLayout>
  );
}
