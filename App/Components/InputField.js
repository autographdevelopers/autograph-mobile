import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import InputLabel from './InputLabel';
import InputFieldLayout from './InputFieldLayout';

/** This component was originally designed to work with redux-form library.
 It receives input and meta object props(check docs) from redux form Field wrapper and also other props you pass to Field component
 **/

export default InputField = ({ input, meta, label, required = false, placeholder, options = {} }) => {
  const styles = StyleSheet.create({
    input: {

      fontSize: Fonts.size.medium,
      color: meta.error ? Colors.salmon : Colors.black
    }
  });

  return (
    <InputFieldLayout errors={meta.error} required={required} label={label}>
      <TextInput value={input.value}
                 style={styles.input}
                 placeholder={placeholder}
                 onChangeText={input.onChange}
                 {...options}
      />
    </InputFieldLayout>

    // <WrapperComponent error={meta.error}>
    //     <TextInput value={input.value}
    //   style={styles.input}
    //   placeholder={placeholder}
    //   onChangeText={input.onChange}
    //   {...options}
    //   />
    // </WrapperComponent>

  // View
  //     {
  //       children
  //     }
  //     {
  //       {meta.error && <Text style={styles.errorZone}>{meta.error}</Text>}
  //
  //     }
  // </View>
  );
}
