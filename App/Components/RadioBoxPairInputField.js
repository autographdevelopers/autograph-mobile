import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import RadioButton from './RadioButton';
import { Fonts, Colors } from '../Themes/';

export default RadioButtonPairInputField = ({ input, meta, data, setValue }) => {
  const styles = StyleSheet.create({
    selectRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginBottom: 15,
      // paddingTop: 10,
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
    <View style={styles.selectRow}>
      {data.map((element, index) => {
        return (
          <View style={styles.selectOption} key={`option-${index}`}>
            <RadioButton value={input.value} boundValue={element.boundValue} setValue={setValue(element.boundValue)}/>
            <Text style={styles.selectLabel}>{element.label}</Text>
          </View>
        );
      }) }
    </View>
  );
}
