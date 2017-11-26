import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../Themes/';

/** This component was originally designed to work with redux-form library.
 * It can be customized to work on his own thought, by providing onTextChange handler
**/

export default InputField = ({input, meta, label, required = false, placeholder}) => {
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
      marginLeft: 3
    },
    input: {
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: meta.error ? Colors.salmon : Colors.mediumGrey,
      fontSize: Fonts.size.medium,
      color: meta.error ? Colors.salmon : Colors.black
    },
    errorZone: {
      color: Colors.salmon,
      fontSize: Fonts.size.small
    },
    space: {
      height: 15
    }
  });

  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        { required && <Text style={styles.asterix}>*</Text>}
      </View>

      <TextInput value={input.value} style={styles.input} placeholder={placeholder}/>

      {meta.error && <Text style={styles.errorZone}>{meta.error}</Text>}
      <View style={styles.space}/>
    </View>
  );
}
