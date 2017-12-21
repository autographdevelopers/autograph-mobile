import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import RadioButton from './RadioButton';
import { Fonts, Colors } from '../Themes/';
import InputFieldLayout from './InputFieldLayout';

export default RadioButtonPairInputField = ({ input, meta, data, setValue, label, asterix }) => {
  const styles = StyleSheet.create({
    selectRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap' // TODO why doesnt wrap?
    },
    selectOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    selectLabel: {
      fontSize: Fonts.size.medium,
      color: Colors.strongGrey,
      marginLeft: 10
    }
  });

  return (
    <InputFieldLayout meta={meta} label={label} required={asterix} line={false}>
      <View style={styles.selectRow}>
        {data.map((element, index) => {
          return (
            <View style={styles.selectOption} key={`option-${index}`}>
              <RadioButton value={input.value} boundValue={element.boundValue} setValue={setValue(element.boundValue)}/>
              <Text style={styles.selectLabel}>{element.label}</Text>
            </View>
          );
        })}
      </View>
    </InputFieldLayout>
  );
}
