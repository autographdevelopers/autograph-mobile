import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../Themes/';
import InputLabel from './InputLabel';

/** This component was originally designed to work with redux-form library.
 It receives input and meta object props(check docs) from redux form Field wrapper and also other props you pass to Field component
**/

export default InputField = ({input, meta, label, required = false, placeholder, options={}}) => {
  const styles = StyleSheet.create({
    input: {
      paddingVertical: 10,
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
      <InputLabel required={required} label={label}/>

      <TextInput value={input.value}
                 style={styles.input}
                 placeholder={placeholder}
                 onChangeText={input.onChange}
                 {...options}
      />

      {meta.error && <Text style={styles.errorZone}>{meta.error}</Text>}
      <View style={styles.space}/>
    </View>
  );
}
